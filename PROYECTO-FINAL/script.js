const app = Vue.createApp({
  data() {
    return {
      vistaActual: 'productos',
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
      usuarioLogueado: null
    };
  },

  computed: {
    totalCarrito() {
      return this.carrito.reduce((total, item) => total + parseFloat(item.precio), 0).toFixed(2);
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
                 producto.imagen
        }));
        
        console.log('Productos cargados:', this.productos);
        
      } catch (error) {
        console.error('Error al cargar productos:', error);
        // Productos de respaldo por si falla la BD
        this.productos = [
          { id: 1, nombre: 'Confeti de colores', precio: '5.00', imagen: 'includes/imgs/confeti1.jpg' },
          { id: 2, nombre: 'Cortinas de fiesta', precio: '10.00', imagen: 'includes/imgs/cortinas1.png' },
          { id: 3, nombre: 'Girnaldas', precio: '7.50', imagen: 'includes/imgs/girnaldas1.jpg' },
          { id: 4, nombre: 'Globos', precio: '8.00', imagen: 'includes/imgs/globos1.png' },
          { id: 5, nombre: 'Piñatas', precio: '12.00', imagen: 'includes/imgs/piñatas1.jpg' },
          { id: 6, nombre: 'Velas de cumpleaños', precio: '3.50', imagen: 'includes/imgs/velas1.jpg' },
        ];
      }
    },

    agregarAlCarrito(producto) {
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

    // Carrusel automático
    setInterval(() => {
      this.index++;
      if (this.index >= this.slides.length) this.index = 0;
    }, 3000);
  }
});

app.mount('#app');