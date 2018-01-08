<template>
  <div>

    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>Goods</span>
        </nav>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoodsUp">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterFlag}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" :class="{'cur':priceLevel === 'all'}" @click="setPrice('all ')">All</a>
              </dd>
              <dd v-for="(price,index) of priceFilter" :key="price.id">
                <a href="javascript:void(0)" :class="{'cur':priceLevel === index}" @click="setPrice(index)">{{price.startPrice}} -- {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">

              <ul style="overflow:hidden">
                <li v-for="item of goodsList" :key="item._id">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/'+item.productImage" alt="item.productName">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>

              <div style="text-align:center;width:100%;height:50px;line-height:40px;" v-if="isNull" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md-overlay" v-if="overLayFlag" @click="closeFilter"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../assets/css/product.css'

  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'


  export default {
    mounted() {
      this.getGoodsList();
    },
    data() {
      return {
        priceFilter: [{
            id: 1,
            startPrice: '0.00',
            endPrice: '99.99'
          },
          {
            id: 2,
            startPrice: '100.00',
            endPrice: '499.99'
          },
          {
            id: 3,
            startPrice: '500.00',
            endPrice: '999.99'
          },
          {
            id: 4,
            startPrice: '1000.00',
            endPrice: '2000.00'
          }
        ],
        priceLevel: 'all',
        filterFlag: false,
        overLayFlag: false,
        goodsList: [],
        sortFlag: 1,
        page: 1,
        pageSize: 8 ,
        busy: true, //设置滚动
        isNull: true        //判断是否还有数据请求
      };
    },
    components: {
      NavHeader,
      NavFooter
    },
    methods: {
      getGoodsList(flag) { //挂载的时候获取数据,flag判断是否是分页去获取
        let args = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag,
          priceLevel:this.priceLevel
        }
        this.$http.get('/goods', {
          params: args
        }).then((res) => {
          let data = res.data;
          if (data.status === 0) {
            if (flag) {
              this.goodsList = this.goodsList.concat(data.result.list);
              if (data.result.count === 0) {
                this.busy = true;
                this.isNull = false;
              } else {
                this.busy = false;
              }
              
            } else {
              this.goodsList = data.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        })
      },
      sortGoodsUp() { //点击价格排序
        this.sortFlag *= -1;
        this.page = 1;
        this.getGoodsList();

      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 100)
      },
      showFilter() {
        this.filterFlag = true;
        this.overLayFlag = true;
      },
      closeFilter() {
        this.filterFlag = false;
        this.overLayFlag = false;

      },
      setPrice(args) {
        this.priceLevel = args;
        this.closeFilter();
        this.getGoodsList();
      }
    }
  };

</script>
