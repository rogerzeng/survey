INSERT INTO `survey`.`survey` (`name`) VALUES ('�����ʾ�1');

INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('����1', 'radio');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('����2', 'checkbox');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('����3', 'select');
INSERT INTO `survey`.`question` (`desc`, `type`) VALUES ('����4', 'textarea');

INSERT INTO `survey`.`item` (`desc`) VALUES ('��');
INSERT INTO `survey`.`item` (`desc`) VALUES ('����');

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

