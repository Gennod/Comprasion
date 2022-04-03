import "./hystmodal.min";

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
});
const myModalGood = new HystModal({
    linkAttributeName: "data-hystmodal",
});



let goodsWrapper = document.querySelector(".comprasion__goods"),
    goodFix = document.querySelectorAll(".comprasion__good-fix"),
    goodDelete = document.querySelectorAll(".comprasion__good-delete"),
    goodCancel = document.querySelector(".hystmodal__btn-good--cancel"),
    modalDelete = document.querySelector(".hystmodal__btn--delete"),
    modalCancel = document.querySelector(".hystmodal__btn--cancel"),
    modalTitle = document.querySelector(".hystmodal__title");

// goodsWrapper.addEventListener("wheel", function (event) {
//     let modifier;
//     if (event.deltaMode == event.DOM_DELTA_PIXEL) {
//         modifier = 1;
//     } else if (event.deltaMode == event.DOM_DELTA_LINE) {
//         modifier = parseInt(getComputedStyle(this).lineHeight);
//     } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
//         modifier = this.clientHeight;
//     }
//     if (event.deltaY != 0) {
//         this.scrollLeft += modifier * event.deltaY;
//         event.preventDefault();
//     }
// });

let goods = [];
let k = 0;
let amount = 0;


goodFix.forEach((fix, idx) => {
    goods.push({ fix, idx, isFixed: "false" });
    fix.addEventListener("click", (evt) => {
        let good = evt.currentTarget.parentNode.parentNode,
            countGoods = 0,
            widthToTranslate = 0,
            fixedGoodsWidth = 0,
            unFixedGoodsAmount = 0,
            fixedGoodsAmount = 0;

        if (goods[idx].isFixed === "true") {

            

            // for (let i = 0; i < goods.length; i++) {
            //     if (goods[i].idx < goods[idx].idx) {
            //         unFixedGoodsAmount += 1;
            //     }
            // }

            // for (let i = 0; i < goods.length; i++) {
            //     if (goods[i].isFixed === "true") {
            //         fixedGoodsAmount += 1;
            //     }
            // }


            

            // console.log(unFixedGoodsAmount, fixedGoodsAmount);

            // for (let i = 0; i < goods.length; i++) {
            //     if (goods[i].idx <= goods[idx].idx && goods[i].isFixed === "false") {
            //         goods[i].fix.parentNode.parentNode.style.transform += `translateX(-${good.offsetWidth + 18}px)`;
            //     }
            // }


            // unFixedGoodsAmount -= 1;

            goods[idx].fix.parentNode.parentNode.style.transform = `translateX(${0})`;

            for (let i = 0; i < goods.length; i++) {
                if (goods[i].idx < goods[idx].idx && goods[i].isFixed === "false") {
                    goods[i].fix.parentNode.parentNode.style.transform += `translateX(-${good.offsetWidth}px)`;
                }
            }


            good.classList.remove("comprasion__good-fix--active");
            goods[idx].isFixed = "false";



            // console.log(fixedGoodsAmount);
            // good.style.transform = `translateX(${(good.offsetWidth + 18)*(fixedGoodsAmount - 1)}px)`;


            // fixedGoodsAmount -= 1;

            // if (goods[idx].fix.parentNode.parentNode.classList.contains("comprasion__god-fix--first")) {
            //     for (let i = 0; i < goods.length; i++) {
            //         if (goods[i].isFixed === "true" && !goods[i].fix.parentNode.parentNode.classList.contains("comprasion__good-fix--last")) {
            //             goods[i].fix.parentNode.parentNode.style.transform += `translateX(-${(good.offsetWidth + 18)}px)`;
            //         }
            //     }
            // }


            // if (good.classList.contains("comprasion__god-fix--first")) {
            //     goods[idx].fix.parentNode.parentNode.classList.remove("comprasion__god-fix--first");
            //     k = 0;
            // }
            

            // good.style.order = goods[idx].idx;
            // goods[idx].isFixed = "false";
            // good.style.transform = `translateX(0)`;
            // good.classList.remove("comprasion__good-fix--active");
            // for (let i = goods.length - 1; i > 0; i--) {
            //     if (goods[i].idx <= goods[idx].idx) {
            //         countGoods = ++countGoods;
            //         goodsWidth += goods[i].fix.parentNode.parentNode.offsetWidth;
            //         goods[i].fix.parentNode.parentNode.style.transform = `translateX(-${goods[i].fix.parentNode.parentNode.offsetWidth + 18}px)`;
            //     }
            //     if (i == 1) {
            //         goods[i-1].fix.parentNode.parentNode.style.transform = `translateX(-${goods[i-1].fix.parentNode.parentNode.offsetWidth + 18}px)`;
            //     }
            // }
        } else {

            goods[idx].fix.parentNode.parentNode.classList.add("comprasion__good-fix--last");
            
            if (k == 0) {
                console.log("s")
                goods[idx].fix.parentNode.parentNode.classList.add("comprasion__good-fix--first");
            }

            k = 1;

            for (let i = 0; i < goods.length; i++) {
                if (goods[i].idx < goods[idx].idx) {
                    unFixedGoodsAmount += 1;
                }
            }

            for (let i = 0; i < goods.length; i++) {
                if (goods[i].isFixed === "true") {
                    fixedGoodsAmount += 1;
                }
            }

            good.style.transform = `translateX(-${(good.offsetWidth)*unFixedGoodsAmount}px)`;


            for (let i = 0; i < goods.length; i++) {
                if (goods[i].idx < goods[idx].idx && goods[i].isFixed === "false") {
                    goods[i].fix.parentNode.parentNode.style.transform += `translateX(${good.offsetWidth}px)`;
                }
            }

            for (let i = 0; i < goods.length; i++) {
                if (goods[i].isFixed === "true") {
                    goods[i].fix.parentNode.parentNode.style.transform += `translateX(${(good.offsetWidth)}px)`;
                }
            }

            good.classList.add("comprasion__good-fix--active");
            goods[idx].isFixed = "true";


            for (let i = 0; i < goods.length; i++) {
               if (goods[i].idx <= goods[idx].idx) {
                   amount += 1;
               }
           }

           console.log(amount)

            for (let i = 0; i < goods.length; i++) {
                if (goods[i].isFixed === "true" &&  goods[idx].idx !== goods[i].idx) {
                    goods[i].fix.parentNode.parentNode.classList.remove("comprasion__good-fix--last");
                }
            }
        }
    });
});


goodDelete.forEach(btn => {
    btn.addEventListener("click", (evt) => {
        let good = evt.currentTarget.parentNode.parentNode.parentNode;

        document.querySelector(".hystmodal__btn-good--delete").addEventListener("click", () => {
            good.remove();
            myModalGood.close();

            if (!document.querySelectorAll(".comprasion__good-fix").length) {
                setTimeout(() => {
                    window.location.href = "/no-goods.html";
                }, 100)
            }
        })
    });
})

console.log(modalCancel);

modalCancel.addEventListener("click", () => {
    myModal.close();
})

goodCancel.addEventListener("click", () => {
    myModalGood.close();
})

modalDelete.addEventListener("click", () => {
    goodFix.forEach(good => good.parentNode.parentNode.remove());
    setTimeout(() => {
        window.location.href = "/no-goods.html";
    }, 100)
    myModal.close();
})


