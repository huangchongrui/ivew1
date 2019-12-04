<template>
  <div class="account">
    <Card>
      <account-table ref="account" editable searchable search-place="top" v-model="accountData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import accountTable from '_c/tables'
import { getAccountData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    accountTable
  }, 
  data () {
    return {
      isDisabled:[],
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'phone', key: 'phone', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        { title: 'permission', key: 'handle' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.accountData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              })
            }
          ]
        },
         { title: 'Disabled', key: 'disabled'},
        {
          title: '禁用',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要禁用吗?'
                },
                on: {
                  'on-ok': () => {
                    console.log(this.isDisabled);
                    params.row.disabled= params.row.disabled=="否" ? "是" :"否";
                    this.$set(this.isDisabled,params.index,this.isDisabled[params.index]= this.isDisabled[params.index]=="禁用" ? "恢复" : "禁用")
                  }
                }
              }, [
                h('Button', this.isDisabled[params.index])
              ])
            }
          ]
        }
      ],
      accountData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.account.exportCsv({
        filename: `account-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getAccountData().then(res => {
      this.accountData = res.data
      for(var i=0;i<this.accountData.length;i++)
      {
        this.isDisabled[i]= this.accountData[i].disabled ? "恢复": "禁用";
        this.accountData[i].disabled = this.accountData[i].disabled ? "是": "否";
      }
      console.log(this.isDisabled)
    })
  }
}
</script>

<style scoped>
  .account /deep/ .ivu-table-wrapper {
    overflow: visible
  }
  .account /deep/ .ivu-poptip-rel>.ivu-btn{
    background-color: #19be6b;
  }
</style>
