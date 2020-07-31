<template>
  <div>
    <header class="header">
      <h1 class="title">Named Galaxies</h1>
      <div class="input">
        <span class="input__ico"></span>
        <input  
          class="input__search"
          type="text"
          placeholder="Search galaxies"
          v-model="searchValue">
      </div>
    </header>

    <div class="table-head">
      <div class="table-head__name">
        <div class="th-txt" @click="toggleSortValue" :class="{active: sortState}">galaxy name <span class="sort-ico"></span></div>
      </div>
      <div class="table-head__constellation">constellation</div>
      <div class="table-head__origin">origin of name</div>
    </div>


    <div class="table">
      <div class="table-row" v-for="(data,idx) in resultData" :key="idx">
        <div class="table-row__name name">
          <span class="mb-name">galaxy name</span>
          <img :src="data.img" class="name__img">
          <div class="name__title"> 
            {{ data.name }}</div>
        </div>
        <div class="table-row__constellation">
          <span class="mb-constellation">constellation</span>
          {{ data.constellation}}
        </div>
        <div class="table-row__origin">
          <span class="mb-origin">origin of name</span>
        {{ data.originOfName }}
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: null,
      sortBy: null,
      sortState: false
    }
  },

  computed: {
    resultData() {
      let apiData = this.apiData
      //Search by name
      if(this.searchValue !== null) {
        apiData = apiData.filter(item => {
          return item.name.toUpperCase().includes(this.searchValue.toUpperCase())
        })
      }
      //Sorting by name
      if(this.sortBy === 'asc') {
        apiData.sort((a,b) => {
          let nameA = a.name.toUpperCase(); 
          let nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      }
      if(this.sortBy === 'desc') {
        apiData.sort((a,b) => {
          let nameA = a.name.toUpperCase(); 
          let nameB = b.name.toUpperCase(); 
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        })
      }
      return apiData
    }
  },

  methods: {
    toggleSortValue(){
      this.sortState = !this.sortState
      this.sortBy = this.sortState === true ? 'asc' : 'desc'
    }
  },

  asyncData({ params, $api }) {
    return $api.get('/galaxies').then(res => {
      return {
        apiData: res.data
      }
    })
  }
}

</script>

<style lang="scss" scoped>

.header {
  display: flex;
  align-items: center;

  @include display-less(tablet) {
    display: block;
  }
}

.title {
  font: 500 34px/40px $roboto;
  color: $grey;
}

.input {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  position: relative;

  &__ico {
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 10px;
    bottom: 10px;
    left: 14px;
    background: url('~assets/images/search-ico.svg');
    cursor: pointer;
  }

  &__search {
    width: 270px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #E0E0E0;
    padding-left: 46px;
    font: 400 14px/36px $roboto;
    color: $grey;
  }
}

.table-head {
  margin-top: 60px;
  display: flex;
  align-items: center;
  height: 14px;
  margin-bottom: 15px;
  width: 100%;

  @include display-less(tablet) {
    display: none;
  }

  &__name {
    width: 20.5%;
    //min-width: 250px;
    font: 900 12px/14px $roboto;
    color: $grey;
    text-transform: uppercase;
    letter-spacing: 1px;
    
  }

  &__constellation{
    width: 16.6%;
    font: 400 12px/14px $roboto;
    color: $grey-light;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__origin {
    width: 62.9%;
    font: 400 12px/14px $roboto;
    color: $grey-light;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.th-txt {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.th-txt.active {
  .sort-ico {
    transform: rotate(180deg)
  }
}

.sort-ico {
  position: absolute;
  display: block;
  right: -15px;
  width: 10px;
  height: 10px;
  top: 1px;
  background: url('~assets/images/sort-ico.svg');
}

.table {
  border: 1px solid #E0E0E0;
  @include display-less(tablet) {
    border: none;
  }
}

.table-row {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #E0E0E0;

  &:hover {
    background: rgba(97, 128, 239, 0.2);
  }

  @include display-less(tablet) {
    display: block;
    margin-bottom: 30px;
    border-top: 1px solid #E0E0E0;
    &:hover {
      background: none;
    }  
  }

  &__name {
    width: 20.5%;
    position: relative;
    flex-grow: 1;
    padding: 20px;
    border-right: 1px solid #E0E0E0;
    display: flex;
    align-items: center;
    @include display-less(tablet) {
      width: 100%;
      border-bottom: 1px solid #E0E0E0;
      border-left: 1px solid #E0E0E0;
      padding-top: 30px;
      &:hover {
        background: rgba(97, 128, 239, 0.2);
      }
    }
  }

  &__constellation{
    width: 16.6%;
    position: relative;
    flex-grow: 1;
    padding: 20px;
    font: 300 16px/24px $roboto;
    color: $grey;
    border-right: 1px solid #E0E0E0;
    display: flex;
    align-items: center;
    @include display-less(tablet) {
      width: 100%;
      border-bottom: 1px solid #E0E0E0;
      border-left: 1px solid #E0E0E0;
      padding-top: 30px;
      &:hover {
        background: rgba(97, 128, 239, 0.2);
      }
    }
  }

  &__origin {
    width: 62.9%;
    position: relative;
    flex-grow: 1;
    padding: 20px;
    font: 300 16px/24px $roboto;
    color: $grey;
    align-items: center;
    @include display-less(tablet) {
      width: 100%;
      border-left: 1px solid #E0E0E0;
      border-right: 1px solid #E0E0E0;
      padding-top: 30px;
      &:hover {
        background: rgba(97, 128, 239, 0.2);
      }
    }
  }
}

.name {
  display: flex;
  align-items: center;

  &__img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  &__title {
    font: 400 16px/24px $roboto;
    color: $grey;
  }
}

.mb-name, .mb-constellation, .mb-origin {
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
  font: 400 10px/1 $roboto;
  color: $grey-light;
  text-transform: uppercase;
  @include display-less(tablet) {
    display: block;
  }
}

.mb-name {
  color: $grey!important;
}
</style>
