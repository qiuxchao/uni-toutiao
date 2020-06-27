<template>
	<!-- 上拉加载组件 -->
	<view class="load-more">
		<uniIcons class="load-icon" type="spinner-cycle" size="30" v-show="status === 1"></uniIcons>
		<text class="load-text">{{ text[status] }}</text>
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue"
	export default {
		props: {
			status: {
				// 0 加载前 1 加载中 2 没有更多了
				type: Number,
				default: 0
			},
			text: {
				type: Array,
				default() {
					return [
						"上拉加载更多",
						"正在加载...",
						"没有更多数据了"
					]
				}
			}
		},
		components: {
			uniIcons
		},
		
	}
</script>

<style lang="scss">
	.load-more {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 90upx;
		padding-top: 10upx;

		.load-icon {
			display: block;
			width: 36upx;
			height: 36upx;
			margin-right: 12upx;
			animation: load 1.2s cubic-bezier(0.37, 1.08, 0.7, 0.74) infinite;
		}

		.load-text {
			font-size: 28upx;
			color: #888;
		}
	}

	@-webkit-keyframes load {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
