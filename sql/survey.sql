SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `survey` DEFAULT CHARACTER SET utf8 ;

USE `survey` ;
-- -----------------------------------------------------

-- Table `survey`.`survey`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`survey` ;

CREATE  TABLE IF NOT EXISTS `survey`.`survey` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `survey`.`question`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`question` ;

CREATE  TABLE IF NOT EXISTS `survey`.`question` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `desc` VARCHAR(255) NULL ,
  `type` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `survey`.`item`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`item` ;

CREATE  TABLE IF NOT EXISTS `survey`.`item` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `desc` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `survey`.`question_item`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`question_item` ;

CREATE  TABLE IF NOT EXISTS `survey`.`question_item` (
  `question_id` INT NOT NULL ,
  `item_id` INT NOT NULL ,
  PRIMARY KEY (`question_id`, `item_id`) ,
  INDEX `fk_question_item_item1_idx` (`item_id` ASC) ,
  CONSTRAINT `fk_question_item_question`
    FOREIGN KEY (`question_id` )
    REFERENCES `survey`.`question` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question_item_item1`
    FOREIGN KEY (`item_id` )
    REFERENCES `survey`.`item` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `survey`.`survey_question`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`survey_question` ;

CREATE  TABLE IF NOT EXISTS `survey`.`survey_question` (
  `survey_id` INT NOT NULL ,
  `question_id` INT NOT NULL ,
  PRIMARY KEY (`survey_id`, `question_id`) ,
  INDEX `fk_survey_question_question1_idx` (`question_id` ASC) ,
  CONSTRAINT `fk_survey_question_survey1`
    FOREIGN KEY (`survey_id` )
    REFERENCES `survey`.`survey` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_survey_question_question1`
    FOREIGN KEY (`question_id` )
    REFERENCES `survey`.`question` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `survey`.`survey_result`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`survey_result` ;

CREATE  TABLE IF NOT EXISTS `survey`.`survey_result` (
  `survey_id` INT NOT NULL ,
  `question_id` INT NOT NULL ,
  `item_id` INT NULL ,
  `year` INT NOT NULL ,
  `grade` INT NOT NULL ,
  `class` INT NOT NULL ,
  `no` VARCHAR(45) NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `shanghaining` INT NOT NULL ,
  `desc` TEXT NULL ,
  INDEX `fk_survey_result_nontext_question1_idx` (`question_id` ASC) ,
  INDEX `fk_survey_result_nontext_item1_idx` (`item_id` ASC) ,
  INDEX `fk_survey_result_nontext_survey1_idx` (`survey_id` ASC) ,
  CONSTRAINT `fk_survey_result_nontext_survey1`
    FOREIGN KEY (`survey_id` )
    REFERENCES `survey`.`survey` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_survey_result_nontext_question1`
    FOREIGN KEY (`question_id` )
    REFERENCES `survey`.`question` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_survey_result_nontext_item1`
    FOREIGN KEY (`item_id` )
    REFERENCES `survey`.`item` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `survey`.`survey` (`name`) VALUES ('调查问卷1');

INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('问题1', 'radio');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('问题2', 'checkbox');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('问题3', 'select');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('问题4', 'textarea');

INSERT INTO `survey`.`item` (`desc`) VALUES ('好');
INSERT INTO `survey`.`item` (`desc`) VALUES ('不好');

INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (1, 1);
INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (1, 2);
INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (2, 1);
INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (2, 2);
INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (3, 1);
INSERT INTO `survey`.`question_item` (`question_id`, `item_id`) VALUES (3, 2);

INSERT INTO `survey`.`survey_question` (`survey_id`, `question_id`) VALUES ('1', '1');
INSERT INTO `survey`.`survey_question` (`survey_id`, `question_id`) VALUES ('1', '2');
INSERT INTO `survey`.`survey_question` (`survey_id`, `question_id`) VALUES ('1', '3');
INSERT INTO `survey`.`survey_question` (`survey_id`, `question_id`) VALUES ('1', '4');

