const { createApp } = Vue;

// 1. Configuración de Supabase
const SUPABASE_URL = 'https://oxwnepmnofxzpgkiigit.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d25lcG1ub2Z4enBna2lpZ2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMDIzMDcsImV4cCI6MjA4MTY3ODMwN30.n-TWFNjcaXrNn_Vl_qwZpXCP6ujwqgNrk12lt8IWXAU';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

createApp({
  data() {
    return {
      prices: {
        one: '...' 
      }
    }
  },
  methods: {
    async fetchPrices() {
      try {
        const { data, error } = await _supabase
          .from('productos')
          .select('precio')
          .eq('nombre', 'cookies');

        if (error) throw error;

        if (data && data.length > 0) {
          this.prices.one = data[0].precio;
        } else {
          console.warn("No se encontró el producto 'cookies'");
          this.prices.one = "No encontrado";
        }
      } catch (err) {
        console.error("Error completo:", err);
        this.prices.one = "Error";
      }
    },
    // Función para despertar el carrusel
    initSwiper() {
      new Swiper('.mySwiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true 
        },
        autoplay: {
          delay: 4000, 
          disableOnInteraction: false,
        },
        allowTouchMove: false,
      });
    }
  },
  mounted() {
    // Primero traemos los precios de Supabase
    this.fetchPrices();
    // Luego activamos el carrusel con sus efectos
    this.initSwiper();
  }
}).mount('#app');