$ (function() {
    let userInput = $('#userInput');
    let buttonEnter = $('#enter');
    let ul = $('ul');
    let total = $('#total');
    let goals = 0;
    let localStorage = window.localStorage;
    let todoMap = [];


    //Функция проверки поля ввода на пустоту
    function inputIsNotEmpty() {
        return !!userInput.val();
    }

    //Создание и удаление заметок
    function createTodo() {

        let li = $("<li>");//Создание новой заметки
        goals++;
        total.text(goals);
        li.append(document.createTextNode(userInput.val()));
        ul.append(li);
        todoMap.push({//Сохранение данных в переменные
            tasksNumber: todoMap.length + 1,
            tasks: userInput.val()
        });
        localStorage.setItem('todolist', JSON.stringify(todoMap));//Сохранение данных в локальное хранилище браузера
        userInput.val('');

        let deleteButton = $('<button>');//Удаление заметки
        deleteButton.append(document.createTextNode('X'));
        li.append(deleteButton);
        deleteButton.click(deleteTodoItem);
        
        li.click(Completed);//Проверка выполнения заметки
        
        
        //Функция проверки выполнения заметки
        function Completed(){
            $('.js-overlay-campaign').slideDown();//Всплывающее окно при выполнении заметки
            $('.js-overlay-campaign').fadeIn();//Всплывающее окно при выполнении заметки
            $('.js-overlay-campaign').addClass('disabled');
            $(document).mouseup(function (e) { 
                var popup = $('.js-popup-campaign');
                if (e.target!=popup[0]&&popup.has(e.target).length === 0){
                    $('.js-overlay-campaign').fadeOut();
                }
            });
            li.toggleClass('done');
        }

        //Удаление заметок
        function deleteTodoItem() {
            li.fadeOut().remove();
            goals--;
            total.text(goals);
        } 
    }
    //Добавление заметки по нажатию на клавишу 'Enter'
    function changeListAfterKeyPress(event) {
        if (inputIsNotEmpty() && event.which == 13) {
            createTodo();
        }
    }
    //Добавление заметки по нажатию на кнопку
    function changeListAfterButtonPress(event) {
        if (inputIsNotEmpty()) {
            createTodo();
        }
    }
    //Функция закрытия всплывающего окна
    $('.js-close-campaign').click(function() { 
        $('.js-overlay-campaign').slideUp(500);
         
    });


    userInput.keypress(changeListAfterKeyPress);
    buttonEnter.click(changeListAfterButtonPress);
    total.text(goals); //Количество всех заметок
})