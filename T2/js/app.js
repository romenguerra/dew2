// js/app.js
const { createApp } = Vue;

const app = createApp({
    // === DATOS REACTIVOS ===
    data() {
        return {
            // Control de vistas
            vistaActual: 'inicio',
            
            // Usuario
            usuarioLogueado: null,
            loginEmail: '',
            loginPassword: '',
            
            // Carrito
            carrito: [],
            
            // Productos
            productos: [],
            
            // Idioma
            idioma: 'es',
            
            // Textos según idioma
            textos: {
                es: {
                    bienvenida: "¡Bienvenido a Fiestón!",
                    carrito: "Carrito",
                    login: "Iniciar Sesión"
                },
                en: {
                    bienvenida: "Welcome to Fiestón!",
                    carrito: "Cart",
                    login: "Login"
                }
            }
        }
    },
    
    // === MÉTODOS ===
    methods: {
        // Cambiar entre vistas (inicio, login, carrito, etc.)
        cambiarVista(vista) {
            this.vistaActual = vista;
            console.log('Cambiando a vista:', vista);
        },
        
        // Login simulado (luego lo conectarás a PHP)
        iniciarSesion() {
            if (this.loginEmail && this.loginPassword) {
                this.usuarioLogueado = {
                    nombre: 'Usuario Demo',
                    email: this.loginEmail
                };
                
                // Guardar en sessionStorage
                sessionStorage.setItem('usuario', JSON.stringify(this.usuarioLogueado));
                
                // Cambiar a vista inicio
                this.vistaActual = 'inicio';
                this.loginEmail = '';
                this.loginPassword = '';
                
                alert('¡Sesión iniciada! (demo)');
            }
        },
        
        // Cerrar sesión
        cerrarSesion() {
            this.usuarioLogueado = null;
            sessionStorage.removeItem('usuario');
            this.vistaActual = 'inicio';
        },
        
        // Agregar producto al carrito
        agregarAlCarrito(producto) {
            this.carrito.push({
                ...producto,
                cantidad: 1
            });
            
            // Guardar en localStorage
            this.guardarCarrito();
            
            alert(`${producto.nombre} agregado al carrito`);
        },
        
        // Eliminar del carrito
        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            this.guardarCarrito();
        },
        
        // Guardar carrito en localStorage
        guardarCarrito() {
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },
        
        // Calcular total del carrito
        calcularTotal() {
            return this.carrito.reduce((total, item) => {
                return total + (item.precio * item.cantidad);
            }, 0).toFixed(2);
        },
        
        // Confirmar pedido
        confirmarPedido() {
            if (this.carrito.length > 0) {
                if (confirm('¿Confirmar pedido?')) {
                    alert('Pedido confirmado. ¡Gracias por tu compra!');
                    this.carrito = [];
                    this.guardarCarrito();
                }
            }
        },
        
        // Cambiar idioma
        cambiarIdioma() {
            this.idioma = this.idioma === 'es' ? 'en' : 'es';
        },
        
        // Filtrar productos por categoría
        filtrarProductos(categoria) {
            console.log('Filtrando por:', categoria);
            this.cargarProductos(categoria);
        }
    },
    
    // === PROPIEDADES COMPUTADAS (requisito 8.3) ===
    computed: {
        textoActual() {
            return this.textos[this.idioma];
        }
    },
    
    // === CICLO DE VIDA ===
    mounted() {
        console.log('Aplicación Vue montada');
        
        // Cargar usuario desde sessionStorage
        const usuarioGuardado = sessionStorage.getItem('usuario');
        if (usuarioGuardado) {
            this.usuarioLogueado = JSON.parse(usuarioGuardado);
        }
        
        // Cargar carrito desde localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            this.carrito = JSON.parse(carritoGuardado);
        }
        
        // Aquí luego cargarás productos desde la BD
        // this.cargarProductos();
    }
});

// Montar la aplicación
app.mount('#app');