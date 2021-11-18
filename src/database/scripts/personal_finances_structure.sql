-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema personal_finances
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema personal_finances
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `personal_finances` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `personal_finances` ;

-- -----------------------------------------------------
-- Table `personal_finances`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personal_finances`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `image` TEXT NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personal_finances`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personal_finances`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personal_finances`.`movements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personal_finances`.`movements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL DEFAULT 1,
  `type` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `amount` DECIMAL(5,2) UNSIGNED NOT NULL,
  `concept` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `categoriy_id_idx` (`category_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
