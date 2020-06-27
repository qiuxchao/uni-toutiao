<template>
	<view>
		<view class="home-header">
			<view class="search-bar">
				<view class="icon iconfont"><uni-icons type="search" size="35"></uni-icons></view>
				<input type="text" class="search-input" placeholder="搜索热点" />
			</view>
		</view>
		<view class="space"></view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.home-header {
	height: 100upx;
	background: #d43d3d;
	padding: 10upx 50upx;
	box-sizing: border-box;
	position: fixed;
	width: 750upx;
	z-index: 99;
}

.search-bar {
	background-color: #fff;
	height: 80upx;
	display: flex;
	align-items: center;
	padding: 10upx 20upx;
	color: #505050;
	border-radius: 10upx;
	box-sizing: border-box;
}

.search-input {
	font-size: 32upx;
	margin-left: 20upx;
}

.space {
	height: 100upx;
}
</style>
