-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2023 at 03:56 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olimpio`
--

-- --------------------------------------------------------

--
-- Table structure for table `estado_tarea`
--

CREATE TABLE `estado_tarea` (
  `id_estado_tarea` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estado_tarea`
--

INSERT INTO `estado_tarea` (`id_estado_tarea`, `nombre`, `url`, `estado`) VALUES
(0, 'Estado de la Tarea', '/tracking/tareas-activas', 1),
(1, 'Pendiente de Recolección', '/tracking/pendiente-recoleccion', 1),
(2, 'Recolectados para Atenderse', '/tracking/recolectados-para-atenderse', 1),
(3, 'Recibidos para Atenderse', '/tracking/recibidos-para-atenderse', 1),
(4, 'Terminados para Recolectar', '/tracking/terminados-para-recolectar', 1),
(5, 'Recolectados para Entrega', '/tracking/recolectados-para-entrega', 1),
(6, 'Entregados a Sucursal Origen', '/tracking/entregados-a-sucursal-origen', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`, `estado`) VALUES
(1, 'Admin', 1),
(2, 'Encargado', 1),
(3, 'Chofer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sucursal`
--

CREATE TABLE `sucursal` (
  `id_sucursal` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sucursal`
--

INSERT INTO `sucursal` (`id_sucursal`, `nombre`, `estado`) VALUES
(1, 'Balbuena', 1),
(2, 'Moctezuma', 1),
(3, 'Eje 1 Norte', 1),
(4, 'Oceanía', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tarea_externa`
--

CREATE TABLE `tarea_externa` (
  `id_tarea_externa` int(11) NOT NULL,
  `id_sucursal_origen` int(20) NOT NULL,
  `ticket` varchar(20) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `id_tipo_trabajo` int(11) NOT NULL,
  `id_sucursal_destino` int(11) NOT NULL,
  `fecha_requerida` date NOT NULL,
  `hora_requerida` time NOT NULL,
  `id_tipo_servicio` int(11) NOT NULL,
  `id_estado_tarea` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_creado_por` int(30) NOT NULL,
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_modificado_por` int(30) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tarea_externa`
--

INSERT INTO `tarea_externa` (`id_tarea_externa`, `id_sucursal_origen`, `ticket`, `descripcion`, `id_tipo_trabajo`, `id_sucursal_destino`, `fecha_requerida`, `hora_requerida`, `id_tipo_servicio`, `id_estado_tarea`, `fecha_creacion`, `id_creado_por`, `fecha_modificacion`, `id_modificado_por`, `estado`) VALUES
(1, 1, '210173', 'SUDADERA ROJA', 4, 2, '2023-02-07', '11:29:00', 1, 5, '2023-02-07 11:30:06', 1, '2023-02-27 17:41:58', 1, 1),
(2, 1, '210173', 'CAMISA DE ONCE VARAS', 1, 2, '2023-02-07', '11:30:00', 1, 4, '2023-02-07 11:30:48', 4, '2023-02-27 16:18:54', 1, 1),
(3, 1, '210173', 'AGUJETAS DE COLOR DE ROSA', 1, 2, '2023-02-07', '11:32:00', 2, 2, '2023-02-07 11:32:14', 1, '2023-02-27 15:54:10', 1, 1),
(4, 1, '210173', 'ESTE ES UN SERVICIO EXPRES', 1, 2, '2023-02-07', '11:34:00', 2, 1, '2023-02-07 11:34:22', 1, '2023-02-27 15:48:44', 1, 1);

--
-- Triggers `tarea_externa`
--
DELIMITER $$
CREATE TRIGGER `td_tarea_externa` AFTER DELETE ON `tarea_externa` FOR EACH ROW insert into tarea_externa_log (
      id_tarea_externa,
      id_tipo_accion,
      id_usuario,
      id_estado_tarea_ini,
      id_estado_tarea_fin
   ) values (
      OLD.id_tarea_externa,
      2,    
      OLD.id_creado_por,
      OLD.id_estado_tarea,
      OLD.id_estado_tarea
   )
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ti_tarea_externa` AFTER INSERT ON `tarea_externa` FOR EACH ROW insert into tarea_externa_log (
      id_tarea_externa,
      id_tipo_accion,
      id_usuario,
      id_estado_tarea_ini,
      id_estado_tarea_fin
   ) values (
       NEW.id_tarea_externa,
       1,    
       NEW.id_creado_por,
       1,
       1
   )
$$
DELIMITER ;
DELIMITER $$
DROP TRIGGER tu_tarea_externa
$$
CREATE TRIGGER `tu_tarea_externa` AFTER UPDATE ON `tarea_externa` FOR EACH ROW insert into tarea_externa_log (
      id_tarea_externa,
      id_tipo_accion,
      id_usuario,
      id_estado_tarea_ini,
      id_estado_tarea_fin
   ) values (
       OLD.id_tarea_externa,
       3,    
       NEW.id_modificado_por,
       OLD.id_estado_tarea,
       NEW.id_estado_tarea
   )
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tarea_externa_log`
--

CREATE TABLE `tarea_externa_log` (
  `id_tarea_externa_log` int(11) NOT NULL,
  `id_tarea_externa` int(11) NOT NULL,
  `id_tipo_accion` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(30) NOT NULL,
  `id_estado_tarea_ini` int(11) NOT NULL,
  `id_estado_tarea_fin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tarea_externa_log`
--

INSERT INTO `tarea_externa_log` (`id_tarea_externa_log`, `id_tarea_externa`, `id_tipo_accion`, `fecha`, `id_usuario`, `id_estado_tarea_ini`, `id_estado_tarea_fin`) VALUES
(1, 1, 1, '2023-02-07 11:30:06', 1, 1, 1),
(2, 2, 1, '2023-02-07 11:30:48', 4, 1, 1),
(3, 3, 1, '2023-02-07 11:32:14', 1, 1, 1),
(4, 4, 1, '2023-02-07 11:34:22', 1, 1, 1),
(6, 5, 2, '2023-02-08 08:59:15', 1, 1, 1),
(7, 3, 3, '2023-02-09 09:39:56', 1, 1, 2),
(8, 4, 3, '2023-02-09 09:39:58', 1, 1, 2),
(9, 1, 3, '2023-02-27 13:08:10', 1, 1, 2),
(10, 2, 3, '2023-02-27 13:09:53', 4, 1, 2),
(11, 1, 3, '2023-02-27 13:11:28', 1, 2, 1),
(12, 2, 3, '2023-02-27 13:18:25', 1, 2, 1),
(13, 3, 3, '2023-02-27 13:18:36', 1, 2, 1),
(14, 4, 3, '2023-02-27 13:18:42', 1, 2, 1),
(15, 1, 3, '2023-02-27 13:18:59', 1, 1, 2),
(16, 2, 3, '2023-02-27 13:25:46', 1, 1, 2),
(17, 1, 3, '2023-02-27 13:26:43', 1, 2, 1),
(18, 2, 3, '2023-02-27 13:26:43', 1, 2, 1),
(19, 3, 3, '2023-02-27 13:26:43', 1, 1, 1),
(20, 4, 3, '2023-02-27 13:26:43', 1, 1, 1),
(21, 1, 3, '2023-02-27 13:37:23', 1, 1, 2),
(22, 2, 3, '2023-02-27 13:41:26', 1, 1, 2),
(23, 3, 3, '2023-02-27 13:42:52', 1, 1, 2),
(24, 4, 3, '2023-02-27 13:44:08', 1, 1, 2),
(25, 1, 3, '2023-02-27 13:45:55', 1, 2, 1),
(26, 2, 3, '2023-02-27 13:45:55', 0, 2, 1),
(27, 3, 3, '2023-02-27 13:45:55', 0, 2, 1),
(28, 4, 3, '2023-02-27 13:45:55', 0, 2, 1),
(29, 1, 3, '2023-02-27 13:46:40', 1, 1, 2),
(30, 2, 3, '2023-02-27 13:52:30', 0, 1, 2),
(31, 1, 3, '2023-02-27 13:53:17', 0, 2, 1),
(32, 2, 3, '2023-02-27 13:53:17', 0, 2, 1),
(33, 3, 3, '2023-02-27 13:53:17', 0, 1, 1),
(34, 4, 3, '2023-02-27 13:53:17', 0, 1, 1),
(35, 1, 3, '2023-02-27 13:53:42', 0, 1, 1),
(36, 2, 3, '2023-02-27 13:53:42', 0, 1, 1),
(37, 3, 3, '2023-02-27 13:53:42', 0, 1, 1),
(38, 4, 3, '2023-02-27 13:53:42', 0, 1, 1),
(39, 1, 3, '2023-02-27 13:54:42', 0, 1, 2),
(40, 2, 3, '2023-02-27 13:55:16', 0, 1, 2),
(41, 1, 3, '2023-02-27 13:59:09', 0, 2, 3),
(42, 3, 3, '2023-02-27 14:03:17', 0, 1, 2),
(43, 1, 3, '2023-02-27 14:04:07', 0, 3, 1),
(44, 2, 3, '2023-02-27 14:04:07', 0, 2, 1),
(45, 3, 3, '2023-02-27 14:04:07', 0, 2, 1),
(46, 4, 3, '2023-02-27 14:04:07', 0, 1, 1),
(47, 1, 3, '2023-02-27 14:08:11', 0, 1, 2),
(48, 2, 3, '2023-02-27 14:10:07', 0, 1, 2),
(49, 3, 3, '2023-02-27 14:11:38', 0, 1, 2),
(50, 4, 3, '2023-02-27 14:15:31', 0, 1, 2),
(51, 1, 3, '2023-02-27 14:15:58', 0, 2, 1),
(52, 2, 3, '2023-02-27 14:15:58', 0, 2, 1),
(53, 3, 3, '2023-02-27 14:15:58', 0, 2, 1),
(54, 4, 3, '2023-02-27 14:15:58', 0, 2, 1),
(55, 1, 3, '2023-02-27 14:16:14', 0, 1, 2),
(56, 2, 3, '2023-02-27 14:17:53', 0, 1, 2),
(57, 3, 3, '2023-02-27 14:19:53', 0, 1, 2),
(58, 4, 3, '2023-02-27 14:22:07', 0, 1, 2),
(59, 1, 3, '2023-02-27 14:23:42', 0, 2, 1),
(60, 2, 3, '2023-02-27 14:23:42', 0, 2, 1),
(61, 3, 3, '2023-02-27 14:23:42', 1, 2, 1),
(62, 4, 3, '2023-02-27 14:23:42', 1, 2, 1),
(63, 1, 3, '2023-02-27 14:25:35', 0, 1, 2),
(64, 2, 3, '2023-02-27 14:27:06', 0, 1, 2),
(65, 3, 3, '2023-02-27 14:28:33', 1, 1, 2),
(66, 4, 3, '2023-02-27 14:30:32', 1, 1, 2),
(67, 1, 3, '2023-02-27 14:31:04', 1, 2, 1),
(68, 2, 3, '2023-02-27 14:31:04', 1, 2, 1),
(69, 3, 3, '2023-02-27 14:31:04', 1, 2, 1),
(70, 4, 3, '2023-02-27 14:31:04', 1, 2, 1),
(71, 1, 3, '2023-02-27 14:56:50', 1, 1, 2),
(72, 2, 3, '2023-02-27 15:01:53', 1, 1, 2),
(73, 3, 3, '2023-02-27 15:02:52', 1, 1, 2),
(74, 4, 3, '2023-02-27 15:06:57', 1, 1, 2),
(75, 1, 3, '2023-02-27 15:08:19', 1, 2, 1),
(76, 2, 3, '2023-02-27 15:08:19', 1, 2, 1),
(77, 3, 3, '2023-02-27 15:08:19', 1, 2, 1),
(78, 4, 3, '2023-02-27 15:08:19', 1, 2, 1),
(79, 1, 3, '2023-02-27 15:08:30', 1, 1, 2),
(80, 2, 3, '2023-02-27 15:10:18', 1, 1, 2),
(81, 3, 3, '2023-02-27 15:12:50', 1, 1, 2),
(82, 1, 3, '2023-02-27 15:17:52', 1, 2, 1),
(83, 2, 3, '2023-02-27 15:17:52', 1, 2, 1),
(84, 3, 3, '2023-02-27 15:17:52', 1, 2, 1),
(85, 4, 3, '2023-02-27 15:17:52', 1, 1, 1),
(86, 1, 3, '2023-02-27 15:18:01', 1, 1, 2),
(87, 2, 3, '2023-02-27 15:18:25', 1, 1, 2),
(88, 3, 3, '2023-02-27 15:18:32', 1, 1, 2),
(89, 1, 3, '2023-02-27 15:18:47', 1, 2, 3),
(90, 4, 3, '2023-02-27 15:20:36', 1, 1, 2),
(91, 2, 3, '2023-02-27 15:20:44', 1, 2, 3),
(92, 4, 3, '2023-02-27 15:20:49', 1, 2, 3),
(93, 1, 3, '2023-02-27 15:20:58', 1, 3, 4),
(94, 1, 3, '2023-02-27 15:21:16', 1, 4, 5),
(95, 1, 3, '2023-02-27 15:25:55', 1, 5, 1),
(96, 2, 3, '2023-02-27 15:25:55', 1, 3, 1),
(97, 3, 3, '2023-02-27 15:25:55', 1, 2, 1),
(98, 4, 3, '2023-02-27 15:25:55', 1, 3, 1),
(99, 1, 3, '2023-02-27 15:26:06', 1, 1, 2),
(100, 2, 3, '2023-02-27 15:26:08', 1, 1, 2),
(101, 3, 3, '2023-02-27 15:26:10', 1, 1, 2),
(102, 1, 3, '2023-02-27 15:26:20', 1, 2, 3),
(103, 2, 3, '2023-02-27 15:26:21', 1, 2, 3),
(104, 1, 3, '2023-02-27 15:26:28', 1, 3, 4),
(105, 1, 3, '2023-02-27 15:26:36', 1, 4, 5),
(106, 2, 3, '2023-02-27 15:27:02', 1, 3, 4),
(107, 3, 3, '2023-02-27 15:47:16', 1, 2, 3),
(108, 4, 3, '2023-02-27 15:48:44', 1, 1, 2),
(109, 1, 3, '2023-02-27 15:49:08', 1, 5, 1),
(110, 2, 3, '2023-02-27 15:49:08', 1, 4, 1),
(111, 3, 3, '2023-02-27 15:49:08', 1, 3, 1),
(112, 4, 3, '2023-02-27 15:49:08', 1, 2, 1),
(113, 1, 3, '2023-02-27 15:49:17', 1, 1, 2),
(114, 2, 3, '2023-02-27 15:51:53', 1, 1, 2),
(115, 3, 3, '2023-02-27 15:51:58', 1, 1, 2),
(116, 1, 3, '2023-02-27 15:54:00', 1, 2, 1),
(117, 2, 3, '2023-02-27 15:54:00', 1, 2, 1),
(118, 3, 3, '2023-02-27 15:54:00', 1, 2, 1),
(119, 4, 3, '2023-02-27 15:54:00', 1, 1, 1),
(120, 1, 3, '2023-02-27 15:54:08', 1, 1, 2),
(121, 2, 3, '2023-02-27 15:54:10', 1, 1, 2),
(122, 3, 3, '2023-02-27 15:54:10', 1, 1, 2),
(123, 1, 3, '2023-02-27 15:54:22', 1, 2, 3),
(124, 2, 3, '2023-02-27 15:54:23', 1, 2, 3),
(125, 1, 3, '2023-02-27 15:54:28', 1, 3, 4),
(126, 2, 3, '2023-02-27 16:18:54', 1, 3, 4),
(127, 1, 3, '2023-02-27 17:41:58', 1, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_accion`
--

CREATE TABLE `tipo_accion` (
  `id_tipo_accion` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipo_accion`
--

INSERT INTO `tipo_accion` (`id_tipo_accion`, `nombre`, `estado`) VALUES
(1, 'insert', 1),
(2, 'delete', 1),
(3, 'update', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_servicio`
--

CREATE TABLE `tipo_servicio` (
  `id_tipo_servicio` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipo_servicio`
--

INSERT INTO `tipo_servicio` (`id_tipo_servicio`, `nombre`, `estado`) VALUES
(1, 'Normal', 1),
(2, 'Exprés', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_trabajo`
--

CREATE TABLE `tipo_trabajo` (
  `id_tipo_trabajo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipo_trabajo`
--

INSERT INTO `tipo_trabajo` (`id_tipo_trabajo`, `nombre`, `estado`) VALUES
(1, 'Lavandería', 1),
(2, 'Tintorería', 1),
(3, 'Planchado', 1),
(4, 'Compostura', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `usuario`, `nombre`, `contrasena`, `email`, `id_rol`, `estado`) VALUES
(1, 'brojas', 'Braulio Rojas', '123456', 'brojas73@hotmail.com', 1, 1),
(2, 'ihernandez', 'Isaac Hernández', '123456', 'ihernandez@email.com', 1, 1),
(3, 'ruben', 'Ruben Apellido', '123456', 'ruben@email.com', 3, 1),
(4, 'yadira', 'Yadira Apellido', '123456', 'yadira@email.com', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estado_tarea`
--
ALTER TABLE `estado_tarea`
  ADD PRIMARY KEY (`id_estado_tarea`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id_sucursal`);

--
-- Indexes for table `tarea_externa`
--
ALTER TABLE `tarea_externa`
  ADD PRIMARY KEY (`id_tarea_externa`);

--
-- Indexes for table `tarea_externa_log`
--
ALTER TABLE `tarea_externa_log`
  ADD PRIMARY KEY (`id_tarea_externa_log`);

--
-- Indexes for table `tipo_servicio`
--
ALTER TABLE `tipo_servicio`
  ADD PRIMARY KEY (`id_tipo_servicio`);

--
-- Indexes for table `tipo_trabajo`
--
ALTER TABLE `tipo_trabajo`
  ADD PRIMARY KEY (`id_tipo_trabajo`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `idx_usuario_u1` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tarea_externa`
--
ALTER TABLE `tarea_externa`
  MODIFY `id_tarea_externa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tarea_externa_log`
--
ALTER TABLE `tarea_externa_log`
  MODIFY `id_tarea_externa_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
