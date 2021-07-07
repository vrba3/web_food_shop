Vue.component("user-orders", {
    data: function () {
        return {
            orders: null,
            user: null
        }
    },
    template: ` 
    <div>    
        <div class="row" >
            <div class="col-12">
            <img src="images/orders.png" alt="" width="90%" height="400" style="margin-left: 90px;">
            </div>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 50px;">
            <label for="" style="font-size: 30px;"> Vaše porudžbine: </label>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 10px; font-size: 22px; text-align: center;">
            <div class="col-10">
                <table>
                    <tr>
                        <th> Porudžbina </th>
                        <th> Restoran </th>
                        <th> Iznos </th>
                        <th> Status </th>
                    </tr>
                    <tr v-for="(order, index) in orders">
                        <td> <label for="" style="margin-left: 20px;"> {{order.id}} </label> </td>
                        <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{order.restaurantID}} </label> </td>
                        <td> <label for="" style="margin-left: 30px;"> {{order.price}} </label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{orderValue(order.orderStatus)}} </label> </td>
                        <td> <button class="btn btn-warning" style="margin-left: 40px;" v-if="inProcessing(order.orderStatus) === true" v-on:click="cancelOrder(order.id, index, order.price)"> Otkaži </button></td>
                    </tr>
                </table>
            </div>
        </div>
        <p style=" margin-left: 200px; font-size: 25px; margin-top: 50px; color: red;"> Napomena: Ukoliko otkažete porudžbinu koja je u stanju obrade, gubite poene na svom nalogu! </p>
    </div>
    `
    ,
    mounted() {
        axios
            .get('/getOrders')
            .then(response => {
                this.orders = response.data;
            });
        axios
            .get('/loggedUser')
            .then(response => {
                if (response.data === 'ERROR') {
                    router.push('/');
                    return;
                }
                this.user = response.data;
            });
    },
    methods: {
        inProcessing: function(orderStatus){
            if(orderStatus === 'PROCESSING'){
                return true;
            }

            return false;
        }, 

        orderValue: function(orderStatus) {
            if(orderStatus === 'PROCESSING'){
                return "OBRADA";
            } else if(orderStatus === 'IN_PREPARATION'){
                return "U PRIPREMI";
            } else if(orderStatus === 'WAITING_FOR_DELIVERY'){
                return "U PRIPREMI";
            } else if(orderStatus === 'IN_TRANSPORT'){
                return "ČEKA DOSTAVLJAČA";
            } else if(orderStatus === 'DELIVERED'){
                return "DOSTAVLJENA";
            } else if(orderStatus === 'CANCELED'){
                return "OTKAZANA";
            }
        }, 

        cancelOrder: function(orderId, index, orderPrice) {
            axios.post('/cancelOrder', {
                id: orderId,
                username: this.user.username,
                price: orderPrice
            })
                .then(function (response) {
                    document.getElementsByTagName('tr')[index + 1].remove();  
                    alert("Porudžbina otkazana!");
                });
        }
    }
});