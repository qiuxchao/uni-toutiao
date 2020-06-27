<template>
	<view class="container">
		<pulldown-refresh ref="pulldownRefresh" @refresh="initVideoData">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view @tap="handleVideoDetail(videoItem)" v-for="(videoItem, index) in videoList" :key="index">
					<videoCell :videoItem="videoItem"></videoCell>
				</view>
				<!-- 上拉加载 -->
				<loadMore :status="loadMoreStatus"></loadMore>
			</scroll-view>
		</pulldown-refresh>
		<view :style="{height: footerbottom + 'px', width: '100%'}"></view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js'
	import videoCell from '../../../components/video/videoCell.vue'
	import pulldownRefresh from '../../../components/pulldown/pulldown.vue'
	import loadMore from '../../../components/loadMore/loadMore.vue'
	export default {
		data() {
			return {
				videoList: [],
				page: 1,
				size: 5,
				loadMoreStatus: 0,
				footerbottom: 0,
			};
		},
		onLoad() {
			this.initVideoData();
			// 兼容 h5 端的底部tabbar
			// #ifdef H5
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.footerbottom = res.windowBottom;
				}
			});
			// #endif 
		},
		methods: {
			handleVideoDetail(videoItem) {
				// 跳转详情页
				uni.navigateTo({
					url: "./videoDetail"
				});
			},
			initVideoData() {
				this.page = 1;
				this.$request({
					url: interfaces.getVideoList + `${this.page}/${this.size}`,
					success: (res) => {
						console.log(res);
						this.videoList = res.data;
						this.loadMoreStatus = 0;
						this.$refs.pulldownRefresh && this.$refs.pulldownRefresh.endPulldownRefresh();
					}
				})
			},
			loadMoreData() {
				// 上拉加载更多
				this.page ++;
				this.loadMoreStatus = 1;
				this.$request({
					url: interfaces.getVideoList + `${this.page}/${this.size}`,
					success: (res) => {
						console.log(res);
						if(res.data.length <= 0) {
							this.loadMoreStatus = 2;
							return;
						}
						res.data.forEach(item => {
							this.videoList.push(item);
						});
						this.loadMoreStatus = 0;
					}
				})
			}
		},
		components: {
			videoCell,
			pulldownRefresh,
			loadMore
		}
	}
</script>

<style lang="scss">
	.panel-scroll-box {
		height: 100%;
		/* #ifdef H5 */
		height: calc(100% - 88px);
		/* #endif */
	}
</style>
