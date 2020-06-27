<template>
	<view class="container">
		<!-- 顶部状态栏占位 -->
		<view class="statuBar" :style="{width: '100vw', height: statusHeight + 'px'}"></view>
		<homeHeader v-if="showHeader"></homeHeader>

		<!-- 分类导航 -->
		<scroll-view
			:scroll-into-view="toview"
			scroll-x="true" 
			class="tab-bar" 
			scroll-with-animation="true"
			>
			<view @tap="onTabTap(index)"
			 :style="{top: 50 + statusHeight + 'px'}"
			 class="uni-tab" v-for="(tab, index) in tabList" :id="tab.id" :key="tab.id">
				<text :class="{'tab-cur': tabIndex == index}" class="uni-tab-item">{{ tab.name }}</text>
			</view>
		</scroll-view>
		
		<!-- 占位 -->
		<view :style="{height: 50 + statusHeight + 'px', width: '100%'}"></view>
		
		<!-- 内容区，可滑动 -->
		<pulldown ref="pdr" :top="top" @refresh="loadTabData">
			<swiper @change="onSwiperChange" :current="tabIndex" class="tab-box" :duration="300">
				<swiper-item class="swiper-item"
					v-for="(page, index) in tabList"
					:key="index"
				>	
				<scroll-view @scrolltolower="loadMoreData" scroll-y="true" class="panel-scroll-box">
					<!-- 新闻列表 -->
					<view class="news-page" 
					v-for="(newsItem, i) in newsList" :key="i">
						<newsCell @cellTap="handleCellTap" :newsItem="newsItem"></newsCell>
					</view>
					<!-- 上拉加载 -->
					<loadMore :status="page.loadMoreStatus"></loadMore>
				</scroll-view>

				</swiper-item>
				
			</swiper>
		</pulldown>
		
		<!-- 底部占位 -->
		<view :style="{height: footerbottom, width: '100%'}"></view>
	</view>
</template>

<script>
	// 头部搜索组件
	import homeHeader from "../../../components/Home/homeHeader/homeHeader.vue"
	// 引入接口文件
	import interfaces from "../../../utils/interfaces.js";
	// 引入单个新闻组件
	import newsCell from "../../../components/Home/homeHeader/newsCell.vue"
	// 引入上拉加载组件
	import loadMore from "../../../components/loadMore/loadMore.vue"
	// 引入下拉刷新组件
	import pulldown from "../../../components/pulldown/pulldown.vue"
	export default {
		name: "Home",
		data() {
			return {
				statusHeight: 0,
				showHeader: true, // 是否显示自定义表头
				tabList: [],  // tab 数据列表
				tabIndex: 0,  // 当前点击的 tab 的下标
				toview: "",   // scroll-view 滚动到的视图id
				page: 1,      // 分页页数
				size: 10,      // 每页条数
				newsid: '',   // 新闻类型
				newsList: [], // 新闻列表
				footerbottom: 0,  // h5 端底部 tabbar 占位高度
				top: 190,      // 与顶部距离 单位 upx
				navigateFlag: false
			
			}
		},
		onLoad() {
			// 如果是原生app
			// #ifdef APP-PLUS
			// 获取手机状态栏高度，动态设置占位高度
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res);
					this.statusHeight = res.statusBarHeight;
				}
			});
			// this.showHeader = false;
			// #endif
			
			// #ifdef H5
			   // h5 端获取底部 tabbar 高度，赋给占位元素
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + "px";
				console.log(this.footerbottom);
			// #endif
			

			this.getTabsData();
		},
		methods: {
			handleCellTap(url) {
				// 点击单条数据跳转详情页面
				// console.log(url);
				if(this.navigateFlag) {
					return;
				} else {
					this.navigateFlag = true;
					uni.navigateTo({
						url: "./article?url="+url
					});
					setTimeout(() => {
						this.navigateFlag = false;
					}, 200)
				}

			},
			loadMoreData() {
				// 上拉加载更多
				this.tabList[this.tabIndex].loadMoreStatus = 1;
				// 更改加载页数
				this.page++;
				// 数据请求
				this.$request({
					url: interfaces.getNewsList + `${this.newsid}/${this.page}/${this.size}`,
					success: (res) => {
						if(res.data.length > 0) {
							res.data.forEach(news => {
								this.newsList.push(news);
							});
						this.tabList[this.tabIndex].loadMoreStatus = 0;	
						} else {
							// 返回数据为空，更改状态，没有更多了
							this.tabList[this.tabIndex].loadMoreStatus = 2;
							return false;
						}
					}
				})
			},
			onSwiperChange(e) {
				// swiper 滑动触发
				console.log(e.detail.current);
				let index = e.detail.current || e.target.current;
				this.tabIndex = index;
				this.toview = this.tabList[index].id;
				
				// 加载内容数据
				this.loadTabData();
				
			},
			getTabsData() {
				// 获取tab数据
				this.$request({
					url: interfaces.getTabList,
					success: (res) => {
						console.log(res);
						res.data.forEach(item => {
							item.loadMoreStatus = 0;
						});
						this.tabList = res.data;
						this.loadTabData();
					}
				});
			},
			onTabTap(index) {
				// 点击tab的事件
				// console.log(index);
				this.tabIndex = index;
			},
			loadTabData() {
				// 获取数据
				this.page = 1;
				// 切换选项卡，初始化加载状态
				this.tabList[this.tabIndex].loadMoreStatus = 0;
				this.newsid = this.tabList.length > 0 ? this.tabList[this.tabIndex].newsid : "all";
				
				// 数据请求
				this.$request({
					url: interfaces.getNewsList + `${this.newsid}/${this.page}/${this.size}`,
					success: (res) => {
						console.log(res.data);
						this.newsList = res.data;
						this.$refs.pdr && this.$refs.pdr.endPulldownRefresh();
					}
				})
			}
		},
		components: {
			homeHeader,
			newsCell,
			loadMore,
			pulldown
		}
	}
</script>

<style lang="scss" scoped>
	.statuBar {
		background-color: #d43d3d;
	}
	.uni-page {
		overflow: hidden;
	}
	// 顶部分类样式
	.tab-bar {
		background: #f4f5f6;
		white-space: nowrap;
		position: fixed;
		z-index: 999;
		.uni-tab {
			display: inline-block;
			white-space: nowrap;
			padding: 20upx 0 20upx 20upx;
			.uni-tab-item {
				padding: 0 20upx;
				height: 52upx;
				line-height: 52upx;
				color: #505050;
			}
			.tab-cur {
				color: #f85959;
			}
		}
	}
	// 隐藏横向滚动条
	.tab-bar ::-webkit-scrollbar {
		width: 0 !important;
		display: none;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	// 内容样式
	.tab-box {
			flex: 1;
			height: 80vh;
			.swiper-item {
				display: flex;
				flex: 1;
				flex-direction: column;
				overflow: hidden;

				.panel-scroll-box {
					height: 100%;
				}
			}
	}
</style>
