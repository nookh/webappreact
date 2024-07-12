import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import axios from "axios"

//const products = [
//    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
//    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
//    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
//    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
//    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
//    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
//    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
//    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
//]

const products = [
    {id: '1', title: 'картошка фри', price: 100, description: 'Синего цвета, прямые'},
    {id: '2', title: 'Бургер', price: 100, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

const [products, setProducts] = useState(null);



useEffect(() => {
// делаем запрос на моунт компоненты
const getProducts = async () => {
    try {
        const tt = await fetch(`https://humans.dilmurod.work/tests/products.php`);
        const tJson = await tt.json()


        setProducts(tJson);
    } catch (error) {
        console.log(error);
    }
}
    getProducts();
}, []);


    const onSendData = useCallback(() => {
        const customItem = addedItems.map((item) => {
        delete item.photo
        return item
        })


        const data = {
            products: customItem,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        tg.sendData(JSON.stringify(data));
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products && products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
