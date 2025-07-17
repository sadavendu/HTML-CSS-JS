document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os itens de todas as listas
    const allListItems = document.querySelectorAll("ol.todo-list li");

    allListItems.forEach(item => {
        item.addEventListener("click", function() {
            item.classList.toggle("completed");
        });
    });
});