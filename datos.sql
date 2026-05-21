-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 10.200.9.131
-- Temps de generació: 20-05-2026 a les 21:11:12
-- Versió del servidor: 10.11.13-MariaDB-deb11-log
-- Versió de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `circuitbarcelona`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `datos`
--

CREATE TABLE `datos` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `tipus` enum('wc','bar','parking','tienda','puerta','tribuna') NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `datos`
--

INSERT INTO `datos` (`id`, `nom`, `tipus`, `lat`, `lng`) VALUES
(1, 'Puerta 1', 'puerta', 41.57358414534825, 2.2577796192549173),
(2, 'Puerta 2', 'puerta', 41.574337562719805, 2.263736902283102),
(3, 'Puerta 3', 'puerta', 41.57045034330061, 2.263384702661838),
(4, 'Puerta 4', 'puerta', 41.566554165553335, 2.26015166405373),
(5, 'Puerta 5', 'puerta', 41.56582755148905, 2.2584747083326744),
(6, 'Puerta 6', 'puerta', 41.56362576279445, 2.251721741815354),
(7, 'Puerta 7', 'puerta', 41.56926685502898, 2.2540137937396962),
(8, 'Tribuna Principal', 'tribuna', 41.57007508192984, 2.2616373930705573),
(9, 'Tribuna A', 'tribuna', 41.564149345230845, 2.254919328417029),
(10, 'Tribuna L', 'tribuna', 41.56482134250079, 2.253589903258085),
(11, 'Tribuna F', 'tribuna', 41.56496196951934, 2.257349635269684),
(12, 'Tribuna E', 'tribuna', 41.56562542636767, 2.257891884622491),
(13, 'Tribuna K', 'tribuna', 41.566288876412436, 2.2584724103923266),
(14, 'Tribuna J', 'tribuna', 41.56731983562511, 2.2593400093341534),
(15, 'WC Tribuna D', 'wc', 41.56901120533182, 2.2608596035299),
(16, 'WC Tribuna F', 'wc', 41.56454812007726, 2.2571259687679928),
(17, 'WC Tribuna E', 'wc', 41.56558364752653, 2.2579413602483567),
(18, 'WC Tribuna B', 'wc', 41.57242252844093, 2.2594326684408466),
(19, 'WC Tribuna C', 'wc', 41.57518356154787, 2.260430450106517),
(20, 'WC Tribuna G', 'wc', 41.57381911226953, 2.2580271910064975),
(21, 'WC Paddock', 'wc', 41.569273959210165, 2.2600103117412362),
(22, 'Food Truck', 'bar', 41.57494258882424, 2.259702186917352),
(23, 'Carpa bar 1', 'bar', 41.56750987524392, 2.2599734342794604),
(24, 'Carpa bar 2', 'bar', 41.567207781256606, 2.2541858785358273),
(25, 'Hot Dogs', 'bar', 41.565885704957374, 2.254920437992722),
(26, 'Parking 1', 'parking', 41.57552903151843, 2.2629809403204852),
(27, 'Parking 2', 'parking', 41.57557718776761, 2.264719011633892),
(28, 'Parking 3', 'parking', 41.57247906259213, 2.2654593012673803),
(29, 'Parking 4', 'parking', 41.566410801286956, 2.2612965130472613),
(30, 'Tienda 1', 'tienda', 41.574581951271014, 2.2579598451126963),
(31, 'Tienda 2', 'tienda', 41.57057677213056, 2.2571873689734034),
(32, 'Tienda 3', 'tienda', 41.568409537612425, 2.258507015711361);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `datos`
--
ALTER TABLE `datos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
