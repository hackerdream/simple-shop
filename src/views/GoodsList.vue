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
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop"  @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterFlag}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" :class="{'cur':priceChecked === 'All'}" @click="setPrice('All')">All</a>
              </dd>
              <dd v-for="(price,index) of priceFilter" :key="price.id">
                <a href="javascript:void(0)" :class="{'cur':priceChecked === index}" @click="setPrice(index)">{{price.startPrice}} -- {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li>
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/1.jpg'" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">999</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>

              </ul>
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
    data() {
      return {
        priceFilter: [{
            id: 1,
            startPrice: '0.00',
            endPrice: '499.99'
          },
          {
            id: 2,
            startPrice: '500.00',
            endPrice: '999.99'
          },
          {
            id: 3,
            startPrice: '1000.00',
            endPrice: '2000.00'
          }
        ],
        priceChecked: 'All',
        filterFlag:false,
        overLayFlag:false
      };
    },
    components: {
      NavHeader,
      NavFooter
    },
    methods:{
        showFilter(){
            this.filterFlag = true;
            this.overLayFlag = true;
        }, 
        closeFilter(){
            this.filterFlag = false;
            this.overLayFlag = false;

        },
        setPrice(args){
            this.priceChecked = args;
            this.closeFilter();
        }
    }
  };

</script>
