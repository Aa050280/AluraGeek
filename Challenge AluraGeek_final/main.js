import { servicesProducts } from "../product_services.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({name, price, image, id}) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                    <div class="img-container">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="card-container--info">
                            <p>${name}</p>
                            <div class="card-container--value">
                                <p>${price}</p>
                                <button class="delete-button" data-id="${id}">
                                        <img src="./imgs/bt_lixo.png" alt="Eliminar">
                                </button>
                            </div>
                    </div>                        
    `;

    addDeleteEvent(card, id);

    return card;
}

function addDeleteEvent(card, id) {
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async() => {
        try {
            await servicesProducts.deleteProduct(id);
            card.remove();
            console.log(`Produto com id ${id} deletado`);
        } catch (error) {
            console.error(`Erro ao deletar o produto com id ${id}:`, error); 
        }
    });     
}

const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Erro ao renderizar produtos:", error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    if (name === "" || price === "" || image === "") {
        alert("Por favor, preencher todos os campos");
    } else {
        try {
            const newProdcut = await servicesProducts.createProduct(
                name,
                price,
                image
            );
            console.log("Produto criado:", newProdcut);
            const newCard = createCard(newProdcut);
        }catch (error) {
            console.error("Erro ao criar o produto:", error);
        }

        form.reset();
    }
});

renderProducts();