<template>
	<view class="container publish-page">
		<!-- 编辑区域 -->
		<view class="edit">
			<textarea v-model="editText" maxlength="-1" placeholder="分享新鲜事" auto-height="true" cursor-spacing="500"></textarea>
		</view>
		<!-- 添加图片 -->
		<view class="imgs-wrap">
			<!-- 显示选择的图片 -->
			<view class="file" v-if="filesArray.length" v-for="(file, index) in filesArray" :key="index">
				<view class="del" @tap="deleteImg(index)">x</view>
				<image :src="file" mode="scaleToFill"></image>
			</view>
			<view class="add-img" @tap="insertImg">
				<uni-icons type="plusempty" size="100"></uni-icons>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="edit-tools-flex">
			<view class="edit-tools" :style="{bottom: tabBarHeight + 'px !important'}">
				<view class="location">
					<uni-icons class="icon" type="location-filled" size="30"></uni-icons>
					<view class="city">成都</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../../../components/uni-icons/uni-icons.vue'
	import interfaces from '../../../utils/interfaces.js'
	// 引入接口文件
	export default {
		data() {
			return {
				tabBarHeight: "0",  // h5 端底部 tabBar 高度
				filesArray: [],  // 图片数组
				limit: 3,  // 最多上传图片数量
				editText: "",  // 内容
			};
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			// e.index == 0 取消  e.index == 1 发布
			if(e.index == 1) {
				// 发布
				this.upLoad();
			} else if (e.index == 0) {
				// home 跳转
				uni.switchTab({
					url: "../home/home"
				});
			}
		},
		onLoad() {
			// #ifdef H5
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.tabBarHeight = res.windowBottom;
				}
			});
			// #endif 
		},
		methods: {
			upLoad() {
				// 发布上传
				let param = {
					title: this.editText,
					source: "QiuXc",
					comment_count: 10,
					datetime: new Date()
				};
				uni.request({
					url: interfaces.postUpload,
					method: "post",
					data: param,
					success: (res) => {
						console.log(res);
						uni.showToast({
							title: "发布成功!",
							icon: "success"
						});
						uni.switchTab({
							url: "../home/home"
						});
						this.$forceUpdate();
					}
				})
			},
			deleteImg(index) {
				// 删除图片
				uni.showModal({
					title: "提示",
					content: "确定要删除此项吗?",
					success: (res) => {
						console.log(res);
						if(res.confirm) {
							// 点击了确定
							this.filesArray.splice(index, 1);
						}
						console.log(this.filesArray);
					}
				})
			},
			insertImg() {
				// 插入图片
				if(this.filesArray.length >= this.limit) {
					uni.showToast({
						title: "已达到最大上传数量",
						icon: "none"
					});
				} else {
					uni.chooseImage({
						count: 3,  // 最多 3 张
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: (res) => {
							console.log(res);
							// 合并图片路径数组
							let fullFilePaths = res.tempFilePaths.map(file => {
								// 将平台路径转为本地绝对路径
								if(!file.startsWith("file://")) {
									let localFile = plus.io.convertLocalFileSystemURL(file);
									return 'file://' + localFile;
								} else {
									return file;
								}
							})
							this.filesArray = [...this.filesArray, ...fullFilePaths];
							// console.log(this.filesArray);
						}
					});
				}

			}
		},
		components: {
			uniIcons
		}
	}
</script>

<style lang="scss">
	.publish-page {
		padding: 30upx;
		box-sizing: border-box;
		overflow-y: auto;

		// edit textarea
		.edit {
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			padding-top: 20upx;

			textarea {
				width: 100%;
			}
		}

		// img icon
		.imgs-wrap {
			margin-top: 30upx;
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			& .file,
			& .add-img {
				width: 32%;
				border: 1px solid #ccc;
				box-sizing: border-box;
				margin-top: 20upx;
				position: relative;
				height: 240upx;
				margin-left: 5upx;
				border-radius: 4upx;
			}

			& .file {
				position: relative;

				.del {
					position: absolute;
					width: 35rpx;
					height: 35rpx;
					background: #f56c6c;
					color: #FFFFFF;
					font-size: 30upx;
					top: 0;
					text-align: center;
					right: 0;
					line-height: 35rpx;
					z-index: 100;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}



			& .add-img {
				display: flex;
				align-items: center;
				justify-content: center;

				.icon {
					font-size: 80upx;
					color: #999;
				}
			}
		}

		// location
		.edit-tools {
			position: fixed;
			z-index: 99;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			border-top: 0.5px solid #ccc;
			height: 98upx;
			align-items: center;
			display: flex;
			box-sizing: border-box;
			justify-content: flex-end;

			.location {
				display: flex;
				margin-right: 30upx;
				align-items: center;
				background: #f0f0f0;
				border-radius: 50upx;
				color: #666666;
				font-size: 24upx;
				padding: 0 20upx;
				height: 51upx;

				.city {
					margin-left: 10upx;
				}

				.icon {
					color: #999;
				}
			}
		}
	}
</style>
