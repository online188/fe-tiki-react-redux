import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Body from './Section/Body';

const HomePage = () => {
    useEffect(() => {
        document.title = 'Mua hàng online giá tốt, hàng chuẩn ship nhanh';
    }, []);
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}
export default HomePage;