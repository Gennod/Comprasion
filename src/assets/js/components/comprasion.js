let goods = [
    {
        img: "./assets/img/goods/good2.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good1.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good3.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good4.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good5.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good5.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good4.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good5.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200 114,00 р/шт ",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
    {
        img: "./assets/img/goods/good5.png",
        price: "100 114,00",
        discount: "-50%",
        oldPrice: "200",
        descr: "Магнитный держатель вывески на крючках с прям..",
    },
];

const goodsWrapper = document.querySelector(".comprasion__goods");

if (goods.length === 0) {
    goodsWrapper.innerHTML = `
        <li class="comprasion__empty">
            <h3 class="comprasion__empty-title">Здесь пока ничего нет</h3>
            <div class="comprasion__empty-descr">Добавляйте товары в список сравнения<br> 
            с помощью <img src="./assets/img/comprasion.svg" alt="comprasion" width="24" height="24"> и выберите лучший!</div>
        </li>
    
    `;
} else {
    goods.forEach((good) => {
        goodsWrapper.innerHTML += `
            <li class="comprasion__good">
				<div class="comprasion__good-top-btns">
					<button class="comprasion__good-fix">
						<img src="./assets/img/goods/fix.svg" alt="fix" width="18" height="18">
					</button>
					<div class="comprasion__good-btns-wrapper">
						<button class="comprasion__good-favorites">
							<img src="./assets/img/goods/favorites.svg" alt="favorites" width="18" height="18">
						</button>
						<button class="comprasion__good-delete">
							<img src="./assets/img/goods/delete.svg" alt="delete" width="18" height="18">
						</button>
					</div>
				</div>
                <div class="comprasion__good-img">
                    <img src="${good.img}" alt="good img">
                </div>
                <div class="comprasion__good-content">
                    <h3 class="comprasion__good-price">${good.price} р/шт</h3>
                    <div class="comprasion__good-discount">
                        <span>${good.discount}</span>
                        <h3 class="comprasion__good-price comprasion__good-price--old">${good.oldPrice}</h3>
                    </div>
                    <div class="comprasion__good-bottom">
                        <div class="comprasion__good-descr">${good.descr}</div>
                        <div class="comprasion__good-btns">
							<button class="comprasion__good-btn" type="submit">
								<img src="./assets/img/market.svg" alt="market" width="24" height="24">
							</button>
						</div>
                    </div>
                </div>
            </li>
        `;
    });
}

goodsWrapper.addEventListener("wheel", function (event) {
    let modifier;
    if (event.deltaMode == event.DOM_DELTA_PIXEL) {
        modifier = 1;
    } else if (event.deltaMode == event.DOM_DELTA_LINE) {
        modifier = parseInt(getComputedStyle(this).lineHeight);
    } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
        modifier = this.clientHeight;
    }
    if (event.deltaY != 0) {
        this.scrollLeft += modifier * event.deltaY;
        event.preventDefault();
    }
});
