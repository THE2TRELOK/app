fetch("r.json")
    .then(response => response.json())
    .then(data => {
        // Создаем виртуальный скролл
        const list = document.querySelector('.list');
        const scroll = new VirtualScroll({
            createNode: () => {
                const item = document.createElement('div');
                item.classList.add('item');
                return item;
            },
            updateNode: (node, index) => {
                const itemData = data[index];
                node.textContent = itemData.text;
            },
            removeNode: (node, index) => {
                node.remove();
            }
        });
        scroll.mount(list);
    });
