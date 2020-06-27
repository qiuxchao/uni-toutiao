<template>
	<!-- 文章详情页 -->
	<view class="article">
		<web-view :src="article_url"></web-view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				article_url: ''
			}
		},
		onLoad(data) {
			console.log(data);
			this.article_url = data.url;
		}
	}
</script>

<style lang="scss">
	.article {
		width: 100%;
		height: 100vh;
	}
</style>
