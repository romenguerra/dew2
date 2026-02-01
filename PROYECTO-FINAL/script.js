const app = Vue.createApp({
  data() {
    return {
      vistaActual: 'inicio',
      index: 0,
      slides: [
        'includes/imgs/confeti1.jpg',
        'includes/imgs/cortinas1.png',
        'includes/imgs/girnaldas1.jpg',
        'includes/imgs/globos1.png',
        'includes/imgs/piñatas1.jpg',
        'includes/imgs/velas1.jpg'
      ],
      productos: [], // Se cargará desde PHP
      carrito: [],
      usuarioNuevo: {
        nombre: '',
        email: '',
        telefono: ''
      },
      usuarioLogin: {
        email: '',
        telefono: ''
      },
      modoAuth: 'login', // 'login' o 'registro'
      usuarioLogueado: null,
      productoSeleccionado: null, // Para la vista detalle
      idiomaActual: 'es', // 'es' o 'en'
      traducciones: {
        es: {
          // Header
          inicio: 'INICIO',
          productos: 'PRODUCTOS',
          acercaDe: 'ACERCA DE',
          iniciarSesion: 'Iniciar Sesión',
          hola: 'Hola, ',
          carrito: 'Carrito',
          idioma: 'Idioma',
          
          // Vistas
          productosDestacados: 'Productos Destacados',
          miCarrito: 'Tu Carrito',
          carritoVacio: '¡El carrito está vacío!',
          total: 'Total',
          confirmarCompra: 'Confirmar Compra',
          seguirComprando: 'Seguir Comprando',
          registroUsuario: 'Registro de Usuario',
          iniciarSesionTitle: 'Iniciar Sesión',
          registroUsuarioTitle: 'Registro de Usuario',
          nombreCompleto: 'Nombre completo',
          correoElectronico: 'Correo electrónico',
          telefono: 'Teléfono',
          registrarse: 'Registrarse',
          iniciarSesionBtn: 'Iniciar Sesión',
          noTienesCuenta: '¿No tienes cuenta? Regístrate',
          yaTienesCuenta: '¿Ya tienes cuenta? Inicia Sesión',
          volverProductos: 'Volver a Productos',
          perfilUsuario: 'Perfil de Usuario',
          nombre: 'Nombre',
          email: 'Email',
          cerrarSesion: 'Cerrar Sesión',
          
          // Botones productos
          anadirCarrito: 'Añadir al carrito',
          iniciaSesionComprar: 'Inicia sesión para comprar',
          
          // Mensajes
          productoAgregado: 'agregado al carrito',
          compraConfirmada: '¡Compra confirmada! Total: ',
          sesionCerrada: 'Sesión cerrada',
          camposRequeridos: 'Rellena todos los campos',
          bienvenido: '¡Bienvenido, ',
          errorRegistro: 'Error al registrar. Intenta de nuevo.',
          errorLogin: 'Error al iniciar sesión. Intenta de nuevo.',
          usuarioNoEncontrado: 'Usuario no encontrado o credenciales incorrectas',
          emailYaRegistrado: 'El email ya está registrado',
          debeIniciarSesion: 'Debes iniciar sesión para añadir productos al carrito',
          errorCargarProductos: 'Error al cargar productos desde la base de datos.',
          
          // Acerca de
          tituloAcercaDe: 'Sobre Fiestón',
          subtituloHistoria: 'Nuestra Historia',
          parrafo1: 'Fiestón nació en 2018 de la pasión por crear momentos inolvidables. Todo comenzó cuando nuestros fundadores, un grupo de amigos amantes de las celebraciones, se dieron cuenta de que organizar fiestas perfectas no debería ser complicado.',
          parrafo2: 'Después de años decorando sus propias fiestas con artículos improvisados, decidieron crear una tienda especializada donde todos pudieran encontrar todo lo necesario para hacer de cada celebración un evento extraordinario.',
          parrafo3: 'Desde nuestros humildes comienzos en un pequeño local de Madrid, hemos crecido hasta convertirnos en la tienda de referencia para fiestas y celebraciones en toda España. Nuestra misión es sencilla: hacer que cada fiesta sea memorable.',
          subtituloCompromiso: 'Nuestro Compromiso',
          parrafo4: 'En Fiestón nos comprometemos a ofrecer productos de la más alta calidad a precios accesibles. Trabajamos directamente con proveedores locales para garantizar la frescura y calidad de nuestros artículos.',
          parrafo5: 'Cada producto en nuestra tienda ha sido seleccionado pensando en crear momentos de alegría. Desde confeti brillante hasta piñatas sorpresa, todo está diseñado para añadir magia a tus celebraciones.',
          subtituloEquipo: 'Nuestro Equipo',
          parrafo6: 'Detrás de Fiestón hay un equipo apasionado de expertos en celebración. Desde diseñadores creativos hasta especialistas en atención al cliente, todos compartimos el mismo objetivo: hacerte sonreír.',
          volverInicio: 'Volver al Inicio',
          
          // Detalle producto
          descripcion: 'Descripción',
          caracteristicas: 'Características',
          precio: 'Precio',
          agregarCarrito: 'Agregar al Carrito',
          volverProductos: 'Volver a Productos'
        },
        en: {
          // Header
          inicio: 'HOME',
          productos: 'PRODUCTS',
          acercaDe: 'ABOUT US',
          iniciarSesion: 'Sign In',
          hola: 'Hello, ',
          carrito: 'Cart',
          idioma: 'Language',
          
          // Vistas
          productosDestacados: 'Featured Products',
          miCarrito: 'Your Cart',
          carritoVacio: 'Your cart is empty!',
          total: 'Total',
          confirmarCompra: 'Confirm Purchase',
          seguirComprando: 'Continue Shopping',
          registroUsuario: 'User Registration',
          iniciarSesionTitle: 'Sign In',
          registroUsuarioTitle: 'User Registration',
          nombreCompleto: 'Full name',
          correoElectronico: 'Email',
          telefono: 'Phone',
          registrarse: 'Register',
          iniciarSesionBtn: 'Sign In',
          noTienesCuenta: 'Don\'t have an account? Sign up',
          yaTienesCuenta: 'Already have an account? Sign in',
          volverProductos: 'Back to Products',
          perfilUsuario: 'User Profile',
          nombre: 'Name',
          email: 'Email',
          cerrarSesion: 'Sign Out',
          
          // Botones productos
          anadirCarrito: 'Add to cart',
          iniciaSesionComprar: 'Sign in to buy',
          
          // Mensajes
          productoAgregado: 'added to cart',
          compraConfirmada: 'Purchase confirmed! Total: ',
          sesionCerrada: 'Session closed',
          camposRequeridos: 'Fill in all fields',
          bienvenido: 'Welcome, ',
          errorRegistro: 'Registration error. Please try again.',
          errorLogin: 'Sign in error. Please try again.',
          usuarioNoEncontrado: 'User not found or incorrect credentials',
          emailYaRegistrado: 'Email already registered',
          debeIniciarSesion: 'You must sign in to add products to cart',
          errorCargarProductos: 'Error loading products from database.',
          
          // Acerca de
          tituloAcercaDe: 'About Fiestón',
          subtituloHistoria: 'Our Story',
          parrafo1: 'Fiestón was born in 2018 from the passion for creating unforgettable moments. It all started when our founders, a group of celebration-loving friends, realized that organizing perfect parties shouldn\'t be complicated.',
          parrafo2: 'After years of decorating their own parties with improvised items, they decided to create a specialized store where everyone could find everything needed to make every celebration an extraordinary event.',
          parrafo3: 'From our humble beginnings in a small shop in Madrid, we have grown to become the reference store for parties and celebrations throughout Spain. Our mission is simple: to make every party memorable.',
          subtituloCompromiso: 'Our Commitment',
          parrafo4: 'At Fiestón we are committed to offering the highest quality products at affordable prices. We work directly with local suppliers to guarantee the freshness and quality of our items.',
          parrafo5: 'Each product in our store has been selected with the thought of creating moments of joy. From shiny confetti to surprise piñatas, everything is designed to add magic to your celebrations.',
          subtituloEquipo: 'Our Team',
          parrafo6: 'Behind Fiestón is a passionate team of celebration experts. From creative designers to customer service specialists, we all share the same goal: to make you smile.',
          volverInicio: 'Back to Home',
          
          // Detalle producto
          descripcion: 'Description',
          caracteristicas: 'Features',
          precio: 'Price',
          agregarCarrito: 'Add to Cart',
          volverProductos: 'Back to Products'
        },
        en: {
          // Header
          inicio: 'HOME',
          productos: 'PRODUCTS',
          acercaDe: 'ABOUT US',
          iniciarSesion: 'Sign In',
          hola: 'Hello, ',
          carrito: 'Cart',
          idioma: 'Language',
          
          // Vistas
          productosDestacados: 'Featured Products',
          miCarrito: 'Your Cart',
          carritoVacio: 'Your cart is empty!',
          total: 'Total',
          confirmarCompra: 'Confirm Purchase',
          seguirComprando: 'Continue Shopping',
          registroUsuario: 'User Registration',
          iniciarSesionTitle: 'Sign In',
          registroUsuarioTitle: 'User Registration',
          nombreCompleto: 'Full name',
          correoElectronico: 'Email',
          telefono: 'Phone',
          registrarse: 'Register',
          iniciarSesionBtn: 'Sign In',
          noTienesCuenta: 'Don\'t have an account? Sign up',
          yaTienesCuenta: 'Already have an account? Sign in',
          volverProductos: 'Back to Products',
          perfilUsuario: 'User Profile',
          nombre: 'Name',
          email: 'Email',
          cerrarSesion: 'Sign Out',
          
          // Botones productos
          anadirCarrito: 'Add to cart',
          iniciaSesionComprar: 'Sign in to buy',
          
          // Mensajes
          productoAgregado: 'added to cart',
          compraConfirmada: 'Purchase confirmed! Total: ',
          sesionCerrada: 'Session closed',
          camposRequeridos: 'Fill in all fields',
          bienvenido: 'Welcome, ',
          errorRegistro: 'Registration error. Please try again.',
          errorLogin: 'Sign in error. Please try again.',
          usuarioNoEncontrado: 'User not found or incorrect credentials',
          emailYaRegistrado: 'Email already registered',
          debeIniciarSesion: 'You must sign in to add products to cart',
          errorCargarProductos: 'Error loading products from database.',
          
          // Acerca de
          tituloAcercaDe: 'About Fiestón',
          subtituloHistoria: 'Our Story',
          parrafo1: 'Fiestón was born in 2018 from the passion for creating unforgettable moments. It all started when our founders, a group of celebration-loving friends, realized that organizing perfect parties shouldn\'t be complicated.',
          parrafo2: 'After years of decorating their own parties with improvised items, they decided to create a specialized store where everyone could find everything needed to make every celebration an extraordinary event.',
          parrafo3: 'From our humble beginnings in a small shop in Madrid, we have grown to become the reference store for parties and celebrations throughout Spain. Our mission is simple: to make every party memorable.',
          subtituloCompromiso: 'Our Commitment',
          parrafo4: 'At Fiestón we are committed to offering the highest quality products at affordable prices. We work directly with local suppliers to guarantee the freshness and quality of our items.',
          parrafo5: 'Each product in our store has been selected with the thought of creating moments of joy. From shiny confetti to surprise piñatas, everything is designed to add magic to your celebrations.',
          subtituloEquipo: 'Our Team',
          parrafo6: 'Behind Fiestón is a passionate team of celebration experts. From creative designers to customer service specialists, we all share the same goal: to make you smile.',
          volverInicio: 'Back to Home',
          
          // Detalle producto
          descripcion: 'Description',
          caracteristicas: 'Features',
          precio: 'Price',
          cantidad: 'Quantity',
          agregarCarrito: 'Add to Cart',
          volverProductos: 'Back to Products'
        }
      }
    };
  },

  computed: {
    totalCarrito() {
      return this.carrito.reduce((total, item) => total + parseFloat(item.precio), 0).toFixed(2);
    },
    t() {
      return this.traducciones[this.idiomaActual];
    }
  },

  methods: {
    // Cargar productos desde PHP
    async cargarProductosDesdeBD() {
      try {
        const respuesta = await fetch('productos.php');
        const datos = await respuesta.json();
        
        // Transformar las rutas de imágenes para que funcionen con tu proyecto
        this.productos = datos.map(producto => ({
          ...producto,
          // Ajustar la ruta de la imagen si es necesario
          imagen: producto.imagen.includes('imgs_productos') ? 
                 `includes/${producto.imagen}` : 
                 producto.imagen,
          // Agregar información detallada por defecto si no viene de BD
          descripcion: producto.descripcion || 'Descripción no disponible',
          caracteristicas: producto.caracteristicas || ['Característica 1', 'Característica 2']
        }));
        
        console.log('Productos cargados:', this.productos);
        
      } catch (error) {
        console.error('Error al cargar productos:', error);
        // Productos de respaldo con información detallada
        this.productos = [
          { 
            id: 1, 
            nombre: 'Confeti de colores', 
            precio: '5.00', 
            imagen: 'includes/imgs/confeti1.jpg',
            descripcion: 'Confeti brillante y colorido perfecto para añadir alegría a cualquier celebración. Disponible en múltiples colores vibrantes.',
            caracteristicas: ['Colores variados', 'Fácil de limpiar', 'Perfecto para fiestas infantiles', 'Paquete de 100g']
          },
          { 
            id: 2, 
            nombre: 'Cortinas de fiesta', 
            precio: '10.00', 
            imagen: 'includes/imgs/cortinas1.png',
            descripcion: 'Cortinas decorativas que transforman cualquier espacio en un lugar de fiesta. Ideales para cumpleaños, graduaciones y eventos especiales.',
            caracteristicas: ['Material resistente', 'Fácil instalación', 'Colores festivos', 'Medidas: 2x3 metros']
          },
          { 
            id: 3, 
            nombre: 'Girnaldas', 
            precio: '7.50', 
            imagen: 'includes/imgs/girnaldas1.jpg',
            descripcion: 'Girnaldas luminosas que crean la atmósfera perfecta para tus celebraciones. Disponibles en varios diseños temáticos.',
            caracteristicas: ['Iluminación LED', 'Batería incluida', 'Varios diseños', 'Duración: 8 horas']
          },
          { 
            id: 4, 
            nombre: 'Globos', 
            precio: '8.00', 
            imagen: 'includes/imgs/globos1.png',
            descripcion: 'Globos de alta calidad para decorar tus fiestas. Incluyen bomba de aire manual para facilitar el inflado.',
            caracteristicas: ['Paquete de 50 unidades', 'Colores surtidos', 'Bomba incluida', 'Material resistente']
          },
          { 
            id: 5, 
            nombre: 'Piñatas', 
            precio: '12.00', 
            imagen: 'includes/imgs/piñatas1.jpg',
            descripcion: 'Piñatas tradicionales mexicanas llenas de dulces y sorpresas. Perfectas para fiestas infantiles y eventos temáticos.',
            caracteristicas: ['Llenas de dulces', 'Diseños temáticos', 'Fáciles de colgar', 'Para 5-8 niños']
          },
          { 
            id: 6, 
            nombre: 'Velas de cumpleaños', 
            precio: '3.50', 
            imagen: 'includes/imgs/velas1.jpg',
            descripcion: 'Velas numeradas para tortas de cumpleaños. Disponibles del 1 al 12, perfectas para celebrar cada año especial.',
            caracteristicas: ['Números del 1-12', 'Colores brillantes', 'Fáciles de colocar', 'Seguras para niños']
          },
        ];
      }
    },

    seleccionarProducto(producto) {
      this.productoSeleccionado = producto;
      this.vistaActual = 'producto-detalle';
    },

    agregarAlCarrito(producto) {
      // Verificar si el usuario está logueado
      if (!this.usuarioLogueado) {
        alert('Debes iniciar sesión para añadir productos al carrito');
        this.vistaActual = 'registro';
        return;
      }

      this.carrito.push(producto);
      localStorage.setItem('carritoFieston', JSON.stringify(this.carrito));
      alert(`${producto.nombre} agregado al carrito`);
    },

    confirmarCompra() {
      if (this.carrito.length === 0) {
        alert('El carrito está vacío');
        return;
      }
      alert(`¡Compra confirmada! Total: ${this.totalCarrito} €`);
      this.carrito = [];
      localStorage.removeItem('carritoFieston');
      this.vistaActual = 'productos';
    },

    cambiarIdioma() {
      this.idiomaActual = this.idiomaActual === 'es' ? 'en' : 'es';
      localStorage.setItem('idiomaFieston', this.idiomaActual);
    },

    // Registrar usuario en PHP
    async registrarUsuario() {
      if (!this.usuarioNuevo.nombre || !this.usuarioNuevo.email || !this.usuarioNuevo.telefono) {
        alert('Rellena todos los campos');
        return;
      }

      try {
        const respuesta = await fetch('usuarios.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.usuarioNuevo)
        });

        const resultado = await respuesta.json();
        
        if (resultado.error) {
          alert(resultado.error);
        } else {
          // Guardar el usuario devuelto por PHP
          this.usuarioLogueado = resultado;
          sessionStorage.setItem('usuarioFieston', JSON.stringify(this.usuarioLogueado));
          
          alert(`¡Bienvenido, ${this.usuarioNuevo.nombre}!`);
          
          // Limpiar formulario y cambiar vista
          this.usuarioNuevo = { nombre: '', email: '', telefono: '' };
          this.vistaActual = 'productos';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar. Intenta de nuevo.');
      }
    },

    // Iniciar sesión
    async iniciarSesion() {
      if (!this.usuarioLogin.email || !this.usuarioLogin.telefono) {
        alert('Rellena email y teléfono');
        return;
      }

      try {
        const respuesta = await fetch(`usuarios.php?email=${encodeURIComponent(this.usuarioLogin.email)}&telefono=${encodeURIComponent(this.usuarioLogin.telefono)}`);
        const resultado = await respuesta.json();
        
        if (resultado.error) {
          alert(resultado.error);
        } else {
          // Guardar el usuario logueado
          this.usuarioLogueado = resultado;
          sessionStorage.setItem('usuarioFieston', JSON.stringify(this.usuarioLogueado));
          
          alert(`¡Bienvenido de vuelta, ${this.usuarioLogueado.nombre}!`);
          
          // Limpiar formulario y cambiar vista
          this.usuarioLogin = { email: '', telefono: '' };
          this.vistaActual = 'productos';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión. Intenta de nuevo.');
      }
    },

    cerrarSesion() {
      this.usuarioLogueado = null;
      sessionStorage.removeItem('usuarioFieston');
      this.vistaActual = 'productos';
      alert('Sesión cerrada');
    }
  },

  mounted() {
    // Cargar productos desde la base de datos
    this.cargarProductosDesdeBD();

    // Cargar usuario si existe en sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuarioFieston');
    if (usuarioGuardado) {
      this.usuarioLogueado = JSON.parse(usuarioGuardado);
    }

    // Cargar carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carritoFieston');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }

    // Cargar idioma desde localStorage
    const idiomaGuardado = localStorage.getItem('idiomaFieston');
    if (idiomaGuardado) {
      this.idiomaActual = idiomaGuardado;
    }

    // Carrusel automático
    setInterval(() => {
      this.index++;
      if (this.index >= this.slides.length) this.index = 0;
    }, 3000);
  }
});


app.component("footer-fieston", {
  template: `
    <footer>
            <div class="footer-item">
                <i class="material-icons">add_location_alt</i>
                <span>Calle del Ritmo nº 27, 2ª Planta, 28015 Madrid, España</span>
            </div>
            <div class="footer-item">
                <i class="material-icons">mail</i>
                <span>contacto@fieston.com</span>
            </div>
            <div class="footer-item">
                <i class="material-icons">add_call</i>
                <span>+34 928 124 578</span>
            </div>
            <p>&copy; 2026 Fiestón. Todos los derechos reservados.</p>
        </footer>
        `
});





app.mount('#app');

// Carrusel
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 1; // empezamos en la primera real
const DELAY = 2000;

function updateCarousel(animate = true) {
  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Posición inicial
updateCarousel(false);

// Autoplay
setInterval(() => {
  index++;
  updateCarousel();

  // Si llegamos al clon final
  if (index === slides.length - 1) {
    setTimeout(() => {
      index = 1;
      updateCarousel(false);
    }, 500);
  }

  // Si llegamos al clon inicial (por seguridad)
  if (index === 0) {
    setTimeout(() => {
      index = slides.length - 2;
      updateCarousel(false);
    }, 500);
  }
}, DELAY);