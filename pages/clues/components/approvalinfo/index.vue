<template>
	<view class="approvalInfoClass">

		<view class="positionLine"></view>
		<form class="formClass">
			<view class="cu-list menu sm-border">
				<view class="cu-item" @click="showOrHideClue(4)" v-show="(showXs||updateData.cstatus>0)">
					<view class="content">
						<text class="text-grey">审核信息</text>
					</view>
					<view v-show="!showOrHide4" class="'text-grey cuIcon-unfold"></view>
					<view v-show="showOrHide4" class="'text-grey cuIcon-fold"></view>
				</view>
			</view>
			<view class="cu-form-group" @click="showModal" v-if="showXs&&updateData.cstatus==0&&showOrHide4">
				<view class="title"><text class="required">*</text>选择销售专员</view>

				<view class="action">
					{{userName!=''?userName:'请选择'}}
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" v-if="updateData.cstatus>0&&showOrHide4">
				<view class="title">销售专员</view>
				<view class="action">
					{{updateData.oaname}}
				</view>
			</view>
			<view class="cu-form-group" v-if="updateData.cstatus>1&&showOrHide4">
				<view class="title">客户级别</view>
				<view class="action">
					{{updateData.level}}
				</view>
			</view>
			<view class="cu-form-group" v-if="updateData.cstatus>1&&showOrHide4">
				<view class="title">客户特点 </view>
				<view class="action">
					{{updateData.custyles}}
				</view>
			</view>
			<view class="cu-form-group" v-if="updateData.cstatus>1&&showOrHide4">
				<view class="title">备注 </view>
				<view class="action">
					{{updateData.remarks}}
				</view>
			</view>

			<view class="cu-form-group" v-if="ShowOA && updateData.cstatus==1&&showOrHide4">
				<view class="title"><text class="required">*</text>客户级别</view>
				<radio-group class="block" @change="radioChange">
					<radio class='round blue margin-left-sm' :class="updateData.level=='A+'?'checked':''" :checked="leave=='A+'?true:false"
					 value="A+"></radio>A+
					<radio class='round blue margin-left-sm' :class="updateData.level=='A'?'checked':''" :checked="leave=='A'?true:false"
					 value="A"></radio>A
					<radio class='round blue margin-left-sm' :class="updateData.level=='A-'?'checked':''" :checked="leave=='A-'?true:false"
					 value="A-"></radio>A-
				</radio-group>
			</view>
			<view class="cu-form-group" v-if="ShowOA && updateData.cstatus==1&&showOrHide4">
				<view class="title usertrait"><text class="required">*</text>客户特点</view>
				<textarea v-model="updateData.custyles" maxlength="500" placeholder="请输入客户特点"></textarea>
			</view>
			<!-- <view class="cu-form-group" v-if="ShowOA && updateData.cstatus==1&&showOrHide4">
				<view class="title usertrait">备注</view>
				<textarea v-model="updateData.remarks" maxlength="500" placeholder="请输入备注"></textarea>
			</view> -->


			<view class="positionLine"></view>

			<view class="cu-list menu sm-border" v-show="(showXs||updateData.cstatus>0)">
				<view class="cu-item" @click="showOrHideClue(5)">
					<view class="content">
						<text class="text-grey">沟通记录</text>
					</view>
					<view v-show="!showOrHide5" class="'text-grey cuIcon-unfold"></view>
					<view v-show="showOrHide5" class="'text-grey cuIcon-fold"></view>
				</view>
			</view>
			<view v-show="showOrHide5" class="customClass">
				<view class="cu-bar bg-white solid-bottom" v-if="(updateData.cstatus==0 && showXs)||(updateData.cstatus==1 && ShowOA)">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						沟通信息
					</view>
				</view>
				<view class="cu-form-group" v-if="(updateData.cstatus==0 && showXs)||(updateData.cstatus==1 && ShowOA)">
					<view class="title">沟通日期</view>
					<picker mode="date" :value="updateData.updatetime" start="1900-01-01" end="3000-12-31" @change="dateChangeTwo">
						<view class="picker">
							{{updateData.updatetime}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" v-if="(updateData.cstatus==0 && showXs)||(updateData.cstatus==1 && ShowOA)">
					<view class="title usertrait">沟通内容</view>
					<textarea v-model="remarks" maxlength="500" placeholder="请输入沟通内容"></textarea>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						沟通日志
					</view>
				</view>
				<view class="cu-form-group" v-if="communicateList.length<=0">
					<text class="customTest">暂无沟通日志</text>
				</view>
				<view class="cu-form-group" v-else v-for="(item,index) in communicateList" :key="index">
					<view class="title">{{item.createtime  | formatTime}}</view>
					<!-- <text class="customTest">{{item.approvalremark}}</text> -->
					<textarea v-model="item.approvalremark" maxlength="500" disabled placeholder=""></textarea>
				</view>

			</view>

		</form>



	</view>
</template>

<script>
	export default {
		props: {
			clueid: {
				type: [Number],
				default: -1
			},
			showXs: {
				type: [Boolean, String],
				default: false
			},
			ShowOA: {
				type: [Boolean, String],
				default: false
			},
			userName: {
				type: [String],
				default: ''
			},
			updateData: {
				type: [Object, Array],
				default: () => {}
			},
			communicateList:{
				type: [Array],
				default: () => []
			}
		},
		data() {
			return {
				showOrHide4: false,
				showOrHide5: false,
				//选择oa的索引
				oauserindex: -1,
				//oa集合
				oausers: [],
				leave: '',
				date: '',
				remarks:'',
				approvalObject: {
					//选择的oa专员
					oauser: -1,
					//客户等级
					userleave: '',
					//客户特点
					usertrait: '',
					//进度记录
					date: ''
				}
			};
		},
		filters: {
			'formatTime': function(value) {
				var _this = this;
				if (value != undefined && value != null && value != '') {
					return value.split('T')[0];
				}
			}
		},
		created() {
			var _this=this;
			console.log("沟通记录为",_this.communicateList)
		},
		methods: {
			showOrHideClue(e) {
				var _this = this;
				if (e == 4)
					_this.showOrHide4 = !_this.showOrHide4;
				if (e == 5)
					_this.showOrHide5 = !_this.showOrHide5;
			},
			pickerChange(e) {
				var _this = this;
				_this.oauserindex = e.detail.value;
				_this.approvalObject.oauser = e.detail.value;
			},
			radioChange(e) {
				var _this = this;
				_this.leave = e.detail.value;
				_this.updateData.level = e.detail.value;
				console.log(_this.leave)
			},
			dateChange(e) {
				var _this = this;
				_this.date = e.detail.value;
				_this.approvalObject.date = e.detail.value;
			},
			dateChangeTwo(e) {
				var _this=this;
				_this.updateData.updatetime = e.detail.value
			},
			submit() {
				var _this = this;
				console.log("这是子组件的提交方法")
				console.log("此处需要验证数据信息啥的")
				console.log(_this.approvalObject)
				uni.showToast({
					title: "客户特点为空",
					icon: 'none',
				})
			},
			showModal() {
				var _this = this;
				this.$emit("showModal", 'viewModal')
			}
		},
		watch:{
			'remarks':function(old,newv){
				this.updateData.remarks=this.remarks;
			}
		}


	}
</script>

<style scoped lang="scss">
	.approvalInfoClass {

		.positionLine {
			height: 10upx;
		}

		.cu-form-group .required {
			color: red;
			line-height: 60upx;
			margin-right: 10upx;
		}

		.cu-form-group .title {
			min-width: calc(6em + 40upx);
			text-align: right;
		}

		.margin-left-sm {
			margin-right: 10upx !important;
		}

		.usertrait {
			margin-top: -100upx;
		}
		.customClass{
			.customTest{
				text-align: center;
				margin-left: 38%;
			}
		}

	}
</style>
