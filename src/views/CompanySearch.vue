<template>
  <div class="enterprise-list">
    <header class="header">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="filterEnterprises" 
          placeholder="搜索企业名称..." 
          class="search-input"
        />
        <button @click="filterEnterprises" class="search-button">搜索</button>
      </div>
    </header>
    
    <div class="filter-bar">
      <select v-model="selectedLocation" @change="filterEnterprises" class="filter-select">
        <option value="">全部地点</option>
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
      <select v-model="selectedIndustry" @change="filterEnterprises" class="filter-select">
        <option value="">全部行业</option>
        <option v-for="industry in industries" :key="industry" :value="industry">
          {{ industry }}
        </option>
      </select>
    </div>

    <div class="enterprise-grid">
      <div v-for="enterprise in filteredEnterprises" :key="enterprise.id" class="enterprise-card">
        {{ enterprise.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedLocation: '',
      selectedIndustry: '',
      enterprises: [
        { id: 1, name: '企业A', location: '北京', industry: '科技' },
        { id: 2, name: '企业B', location: '上海', industry: '金融' },
        { id: 3, name: '企业C', location: '深圳', industry: '科技' },
        { id: 4, name: '企业D', location: '广州', industry: '制造' }
      ],
      locations: ['北京', '上海', '深圳', '广州'],
      industries: ['科技', '金融', '制造']
    };
  },
  computed: {
    filteredEnterprises() {
      return this.enterprises.filter(enterprise => {
        const matchesSearchQuery = enterprise.name.includes(this.searchQuery);
        const matchesLocation = this.selectedLocation ? enterprise.location === this.selectedLocation : true;
        const matchesIndustry = this.selectedIndustry ? enterprise.industry === this.selectedIndustry : true;
        return matchesSearchQuery && matchesLocation && matchesIndustry;
      });
    }
  },
  methods: {
    filterEnterprises() {
      // 触发计算属性更新
    }
  }
};
</script>

<style scoped>
.enterprise-list {
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background-color: #def0f4;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px;
  outline: none;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #00bebd;
  background-color: #00bebd;
  color: #fff;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  outline: none;
}

.search-button:hover {
  background-color: #00a9a9;
}

.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
}

.filter-select {
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

.enterprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.enterprise-card {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: #333;
  transition: transform 0.3s, box-shadow 0.3s;
}

.enterprise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
