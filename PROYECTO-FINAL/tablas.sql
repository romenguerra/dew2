CREATE DATABASE IF NOT EXISTS tienda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda;

-- TABLA PRODUCTOS
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  disponibilidad INT NOT NULL DEFAULT 0,
  imagen VARCHAR(255), -- URL de la imagen del producto
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLA USUARIOS
CREATE TABLE usuarios (
  id_usuario VARCHAR(50) PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(50),
  cuenta_bancaria VARCHAR(100),
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INSERTAR PRODUCTOS
INSERT INTO productos (nombre, descripcion, precio, disponibilidad, imagen) VALUES
('Confeti de colores', 'Paquete de confeti multicolor para celebraciones', 5.00, 50, 'includes/imgs/confeti1.jpg'),
('Cortinas de fiesta', 'Cortinas decorativas para decorar espacios', 10.00, 30, 'includes/imgs/cortinas1.png'),
('Girnaldas decorativas', 'Guirnaldas de papel para fiestas', 7.50, 40, 'includes/imgs/girnaldas1.jpg'),
('Globos de colores', 'Set de 100 globos de diferentes colores', 8.00, 100, 'includes/imgs/globos1.png'),
('Piñatas divertidas', 'Piñatas temáticas para cumpleaños', 12.00, 20, 'includes/imgs/piñatas1.jpg'),
('Velas de cumpleaños', 'Velas numéricas y de decoración', 3.50, 60, 'includes/imgs/velas1.jpg');