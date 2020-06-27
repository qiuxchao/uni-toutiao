<template>
<!-- 	该部分为下拉容器 绑定容器的高度(页面内容高度 - 距离顶部距离)，并绑定下拉的偏移量和回弹过渡时间
	h5中 100vh 会包含 tabbar 高度，因此需使用 100% 替换 -->
	<!-- #ifdef H5 -->
	<view class="refresh-content" 
	@touchstart="handleTouchstart"
	@touchmove="handleTouchmove"
	@touchend="handleTouchend"
	:style="{
		transform: 'translateY(' + pageDeviation + 'px)',
		transition: pageTransition + 's',
		height: 'calc(100% - ' + pageTop + 'px)',
		maxHeight: 'calc(100% - ' + pageTop + 'px)'
	}">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="refresh-content" 
	@touchstart="handleTouchstart"
	@touchmove="handleTouchmove"
	@touchend="handleTouchend"
	:style="{
		transform: 'translateY(' + pageDeviation + 'px)',
		transition: pageTransition + 's',
		height: 'calc(100vh - ' + pageTop + 'px)',
		maxHeight: 'calc(100vh - ' + pageTop + 'px)'
	}">
	<!-- #endif -->
		<!-- 下拉刷新动画 -->
		<view class="loading-wrapper">
			<uni-icons :class="{loading: loading}" class="loading-icon" type="reload" size="30"></uni-icons>
		</view>
		<!-- 插槽 -->
		<slot></slot>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		props: {
			top: {
				// 距离顶部距离，单位upx
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				loading: false,
				pageDeviation: 0,
				pageTransition: 0,
				startY: 0,
				moveY: 0,
				touchend: false,  // 是否结束触摸
			}
		},
		methods: {
			handleTouchstart(e) {
				// 开始触摸
				// console.log(e)
				this.loading = true;
				this.touchend = false;
				this.pageTransition = 0;
				this.startY = e.touches[0].pageY;
			},
			handleTouchmove(e) {
				// 触摸移动
				// console.log(e)
				if(this.touchend) {
					return;
				}
				this.moveY = e.touches[0].pageY - this.startY;
				
				if(this.moveY >= 0) {
					this.pageDeviation = this.moveY;
				}
			},
			handleTouchend(e) {
				// 触摸结束
				// console.log(e)
				this.loading = false;
				this.touchend = true;
				if(this.moveY == 0) {
					return;
				}
				
				this.pageTransition = 0.3;
				
				if(this.moveY >= 50) {
					// 加载数据
					this.startPulldownRefresh();
				}
				
				this.startY = this.moveY = 0;
			},
			startPulldownRefresh() {
				// 加载数据
				// console.log("加载数据");
				this.pageDeviation = uni.upx2px(90);
				// 注册事件
				this.$emit('refresh');
			},
			endPulldownRefresh() {
				this.pageDeviation = uni.upx2px(0);
			}
		},
		computed: {
			pageTop() {
				return uni.upx2px(this.top);
			}
		},
		components: {
			uniIcons
		}
	}
</script>

<style lang="scss">
	.refresh-content {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 1;
	
		/* 下拉刷新部分 */
		.loading-wrapper {
			position: absolute;
			left: 0;
			top: 0;
			transform: translateY(-100%);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
	
			.loading-icon {
				width: 70upx;
				height: 70upx;
				transition: .3s;
			}
	
			.loading-icon.ready {
				transform: scaleX(1.3);
			}
	
			.loading-icon.active {
				animation: loading .5s ease-in infinite both alternate;
			}
			.loading-icon.loading {
				animation: load .5s ease infinite;
			}
		}

	
	}
	
	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}
	
		100% {
			transform: translateY(4upx) scaleX(1.3);
		}
	}
	@keyframes load {
		0% {
			transform: rotate(0deg);
		}
		100% {	
			transform: rotate(360deg);
		}
	}
</style>
