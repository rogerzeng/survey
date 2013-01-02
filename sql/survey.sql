SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';



DROP SCHEMA IF EXISTS `survey` ;

CREATE SCHEMA IF NOT EXISTS `survey` DEFAULT CHARACTER SET utf8 ;

USE `survey` ;



-- -----------------------------------------------------

-- Table `survey`.`survey`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`survey` ;



CREATE  TABLE IF NOT EXISTS `survey`.`survey` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `name` VARCHAR(255) NOT NULL ,

  `online` TINYINT(1) NULL ,

  PRIMARY KEY (`id`) ,

  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )

ENGINE = InnoDB;





-- -----------------------------------------------------

-- Table `survey`.`question`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`question` ;



CREATE  TABLE IF NOT EXISTS `survey`.`question` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `s_id` INT NOT NULL ,

  `type` VARCHAR(45) NOT NULL ,

  `desc` VARCHAR(255) NULL ,

  PRIMARY KEY (`id`) ,

  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,

  INDEX `fk_question_survey1_idx` (`s_id` ASC) ,

  CONSTRAINT `fk_question_survey1`

    FOREIGN KEY (`s_id` )

    REFERENCES `survey`.`survey` (`id` )

    ON DELETE CASCADE

    ON UPDATE NO ACTION)

ENGINE = InnoDB;





-- -----------------------------------------------------

-- Table `survey`.`item`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`item` ;



CREATE  TABLE IF NOT EXISTS `survey`.`item` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `q_id` INT NOT NULL ,

  `desc` VARCHAR(255) NOT NULL ,

  PRIMARY KEY (`id`) ,

  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,

  INDEX `fk_item_question1_idx` (`q_id` ASC) ,

  CONSTRAINT `fk_item_question1`

    FOREIGN KEY (`q_id` )

    REFERENCES `survey`.`question` (`id` )

    ON DELETE CASCADE

    ON UPDATE NO ACTION)

ENGINE = InnoDB;





-- -----------------------------------------------------

-- Table `survey`.`survey_result`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `survey`.`survey_result` ;



CREATE  TABLE IF NOT EXISTS `survey`.`survey_result` (

  `id` INT NOT NULL AUTO_INCREMENT ,

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

  PRIMARY KEY (`id`) ,

  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,

  CONSTRAINT `fk_survey_result_nontext_survey1`

    FOREIGN KEY (`survey_id` )

    REFERENCES `survey`.`survey` (`id` )

    ON DELETE CASCADE

    ON UPDATE NO ACTION,

  CONSTRAINT `fk_survey_result_nontext_question1`

    FOREIGN KEY (`question_id` )

    REFERENCES `survey`.`question` (`id` )

    ON DELETE CASCADE

    ON UPDATE NO ACTION,

  CONSTRAINT `fk_survey_result_nontext_item1`

    FOREIGN KEY (`item_id` )

    REFERENCES `survey`.`item` (`id` )

    ON DELETE CASCADE

    ON UPDATE NO ACTION)

ENGINE = InnoDB;







SET SQL_MODE=@OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `survey`.`survey`(`id`, `name`, `online`) VALUES (1, '问卷1', 1);

INSERT INTO `survey`.`question`(`id`, `s_id`, `type`, `desc`) VALUES (1, 1, 'radio', '单选题');
INSERT INTO `survey`.`question`(`id`, `s_id`, `type`, `desc`) VALUES (2, 1, 'checkbox', '多选题');
INSERT INTO `survey`.`question`(`id`, `s_id`, `type`, `desc`) VALUES (3, 1, 'select', '下拉框');
INSERT INTO `survey`.`question`(`id`, `s_id`, `type`, `desc`) VALUES (4, 1, 'textarea', '文本框');

INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (1, 1,'选项1');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (2, 1,'选项2');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (3, 1,'选项3');

INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (4, 2,'选项a');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (5, 2,'选项b');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (6, 2,'选项c');

INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (7, 3,'选项x');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (8, 3,'选项y');
INSERT INTO `survey`.`item`(`id`, `q_id`, `desc`) VALUES (9, 3,'选项z');
