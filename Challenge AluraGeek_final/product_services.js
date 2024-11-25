const BASE_URL = "https://673a881d339a4ce445185b20.mockapi.io/products";

const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao obter a lista de produtos:", error);
    }
};

const createProduct = async (name, price, image) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, price, image}),
        });

        const data = await response.json();
        console.log("Solicitação POST feita com sucesso:", data);
        return data;
    } catch (error) {
        console.error("Erro na solicitação POST:", error);
    }     
};

const deleteProduct =async (id) => {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE" ,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(`Produto com id ${id} deletado com sucesso`);
    } catch (error) {
        console.error("Erro na solicitação DELETE:", error);
    }
};

export const servicesProducts = {
    productList,
    createProduct,
    deleteProduct,
};