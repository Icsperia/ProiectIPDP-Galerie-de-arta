-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: art_gallery
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id_artist` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Bianca Husu','....','/images/artist/bia.jpg'),(2,'Georgiana Sanda','....','/images/artist/georgi.jpg'),(3,'Marian Girbacea',NULL,'/images/artist/marian.jpg');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arts`
--

DROP TABLE IF EXISTS `arts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arts` (
  `id_art` int NOT NULL AUTO_INCREMENT,
  `art_name` varchar(255) DEFAULT NULL,
  `art_description` text,
  `price` float DEFAULT NULL,
  `art_images` text,
  `categorie` varchar(255) DEFAULT NULL,
  `id_artist` int DEFAULT NULL,
  PRIMARY KEY (`id_art`),
  KEY `id_artist` (`id_artist`),
  CONSTRAINT `arts_ibfk_1` FOREIGN KEY (`id_artist`) REFERENCES `artists` (`id_artist`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arts`
--

LOCK TABLES `arts` WRITE;
/*!40000 ALTER TABLE `arts` DISABLE KEYS */;
INSERT INTO `arts` VALUES (1,'Forest','In the forest with deep green trees in the back is an old wooden cabin seen on the right. Beside it, a turbulent river breaks into a cascade on the rocks. On the left side are three deer and a little roe deer looking into the forest.',99.99,'/images/acrylic/acrylic_forest.jpg,/images/acrylic/acrylic_forest1.jpg,/images/acrylic/acrylic_forest2.jpg','acrylic',NULL),(2,'Forest','In the forest with deep green trees in the back is a old wooden cabin see in the right, from beside her come a turbulent river with speed and breaks into a cascade on the rooks. In the left side are three deer and one little roe deer who looks in the forest.',99.99,'/images/acrylic/acrylic_forest.jpg,/images/acrylic/acrylic_forest1.jpg,/images/acrylic/acrylic_forest2.jpg','acrylic',1),(3,'Cascade',NULL,99.99,'/images/acrylic/acrylic_cascade.jpg,/images/acrylic/acrylic_cascade2.jpg,/images/acrylic/acrylic_cascade3.jpg','acrylic',1),(4,'River',NULL,99.99,'/images/acrylic/acrylic_river2.jpg,/images/acrylic/acrylic_river1.jpg,/images/acrylic/acrylic_river3.jpg','acrylic',1),(5,'Cat','Cat painting in acylic. The head of a reddish-brown cat, with white details, large hazel eyes, a small pink nose, on a fresh green and forest green background.',99.99,'/images/acrylic/acrylic_cat.jpg','acrylic',1),(6,'Cascade',NULL,99.99,'/images/acrylic/acrylic_mountain.jpg,/images/acrylic/acrylic_mountain1.jpg,/images/acrylic/acrylic_mountain2.jpg','acrylic',1),(7,'Sunrise',NULL,99.99,'/images/acrylic/acrylic_sunrise.jpg,/images/acrylic/acrylic_sunrise1.jpg,/images/acrylic/acrylic_sunrise2.jpg','acrylic',1),(8,'Icon',NULL,99.99,'/images/acrylic/acrylic_icon1.jpg,/images/acrylic/acrylic_icon2.jpg','acrylic',1),(9,'Lake',NULL,99.99,'/images/acrylic/acrylic_lake.jpg,/images/acrylic/acrylic_lake1.jpg','acrylic',1),(10,'Fire',NULL,99.99,'/images/acrylic/acrylic_fire1.jpg,/images/acrylic/acrylic_fire2.jpg','acrylic',1),(11,'Zendaya','Realistic portrait of Zendaya',99.99,'/images/portret/portret_zendaya2.jpg,/images/portret/portret_zendaya.jpg,/images/portret/portret_zendaya1.jpg','portraits',1),(12,'The witcher','Portrait of The Witcher character',99.99,'/images/portret/portret_witcher1.jpg','portraits',1),(13,'Dark dress',NULL,99.99,'/images/draw/rochieA.jpg,/images/draw/rochieA1.jpg','dress',1);
/*!40000 ALTER TABLE `arts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_art` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_art` (`id_art`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_art`) REFERENCES `arts` (`id_art`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_art` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `judet` varchar(255) DEFAULT NULL,
  `oras` varchar(255) DEFAULT NULL,
  `strada` varchar(255) DEFAULT NULL,
  `tele` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,'Marian','Ionut','1','2','3','4'),(2,1,1,'Marian','Ionut','1','2','Undeva','4'),(3,1,2,'Marian','Ionut','1','2','3','4'),(4,1,7,'Marian','Ionut','1','2','3','4');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `registered` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name_2` (`user_name`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `user_name_3` (`user_name`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `user_name_4` (`user_name`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `user_name_5` (`user_name`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `user_name_6` (`user_name`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `user_name_7` (`user_name`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `user_name_8` (`user_name`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `user_name_9` (`user_name`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `user_name_10` (`user_name`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `user_name_11` (`user_name`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `user_name_12` (`user_name`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `user_name_13` (`user_name`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `user_name_14` (`user_name`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `user_name_15` (`user_name`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `user_name_16` (`user_name`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `user_name_17` (`user_name`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `user_name_18` (`user_name`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `user_name_19` (`user_name`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `user_name_20` (`user_name`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `user_name_21` (`user_name`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `user_name_22` (`user_name`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `user_name_23` (`user_name`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `user_name_24` (`user_name`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `user_name_25` (`user_name`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `user_name_26` (`user_name`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `user_name_27` (`user_name`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `user_name_28` (`user_name`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `user_name_29` (`user_name`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `user_name_30` (`user_name`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `user_name_31` (`user_name`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `user_name_32` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marian','$2b$10$kvZqz9gA7puCB3yvOZ2AfeqZ5kkg4HRT9uPPzsp9mdGR0aXJjW6YS','1@email.com','Marian','Ionut','2025-05-22 00:23:40','2025-05-29 20:09:52'),(2,'Ics','$2b$10$oSZd7QQHbrjmXd9YReydJOjQnwcIgCRIGoVrcGGXsQ84rfCOFYuB6','5@gmail.com','Marian','Ionut','2025-05-23 05:28:06','2025-05-23 05:46:55'),(3,'Cevas','$2b$10$MJ0o/AXcv3w03L0Gnhz1BOt/G1Co9jqzKPxbi8yphcNXx77yjW2Mq','user@example.com','Marian','Ionut','2025-05-27 19:56:19',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 20:15:51
