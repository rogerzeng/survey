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

