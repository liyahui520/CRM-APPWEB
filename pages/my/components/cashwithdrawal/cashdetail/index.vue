<template>
	<view class="cashDetail">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现详情</block>
		</cu-custom>
		<view class="detail">
			<view class="cu-card case">
				<view class="cu-item shadow">

					<view class="cashDeatil">
						<view class="money">
							￥{{detailInfo.amount}}
						</view>
						<view class="statusText text-xs">
							{{statusObject[detailInfo.capitalStatus]}}
						</view>

					</view>


					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现信息
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">{{bankText}}</view>
						<view class="text-xs">{{detailInfo.payeename}}</view>
					</view>
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现进度
						</view>
					</view>
					<view class="cu-timeline">
						<view class="cu-item text-blue cuIcon-radioboxfill">
							<view class="content">
								已提交至财务等待打款
							</view>
						</view>
						<view v-if="detailInfo.capitalStatus!=2" class="cu-item lastApproval cuIcon-radioboxfill" :class="detailInfo.capitalStatus==1?'text-blue':''">
							<view class="content">
								已完成
							</view>
						</view>
						<view v-if="detailInfo.capitalStatus==2" class="cu-item text-red lastApproval">
							<view class="content">
								提现失败
							</view>
						</view>
					</view>
					<view v-if="detailInfo.remark!=''&&detailInfo.remark!=null" class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							备注信息
						</view>
					</view>
					<view v-if="detailInfo.remark!=''&&detailInfo.remark!=null" class="cu-form-group">
						<view class="title usertrait">备注</view>
						<view>{{detailInfo.remark}}</view>
						<!-- <textarea v-model="remark" maxlength="500" placeholder="请输入备注"></textarea> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectCapitalApplyDetail
	} from '@/api/pay.js'
	import dictionary from '@/utils/dictionary.js';
	import Router from '@/router'
	export default {
		data() {
			return {
				detailInfo: {},
				statusObject: dictionary.capitalStatus,
				bankText: ''
			};
		},
		created() {
			var _this = this;
			console.log(_this.$Route.query.cashid)
			var cashid = _this.$Route.query.cashid;
			console.log("提现id为", cashid)
			_this.loadApplyInfo(cashid);

		},
		methods: {
			loadApplyInfo(id) {
				var _this = this;
				selectCapitalApplyDetail(id).then(response => {
					console.log("返回的信息为", response)
					if (response.code != 200) {
						uni.showToast({
							title: '获取提现信息异常请稍后再试',
							icon: "none"
						});
						return;
					}
					console.log("申请信息为", response.data)
					_this.detailInfo = response.data;
					if (response.data.payMethodType == 4) {
						_this.bankText = response.data.bankaccount + "(" + response.data.account.substr(response.data.account.length -
							4) + ")";
					} else {
						_this.bankText = '其他方式';
					}
					console.log(_this.detailInfo)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cashDetail {
		.detail {
			.cashDeatil {
				margin: 80upx;

				.money {
					text-align: center;
					font-size: 60upx;
					color: red;

				}

				.statusText {
					font-size: 24upx;
					color: #666666;
					text-align: center;
				}
			}

			.cu-timeline>.cu-item>.content {
				padding: 6upx 30upx 30upx 30upx;
			}

			.lastApproval {
				margin-bottom: 30upx;
			}
		}
	}
</style>
