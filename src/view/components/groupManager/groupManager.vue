<template>
  <div class="group">
    <Card>
      <group-table ref="group" editable searchable search-place="top" v-model="groupData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Page :total="100"/>
    </Card>
  </div>
</template>

<script>
import groupTable from '_c/tables'
import { getGroupData } from '@/api/data'
export default {
  name: 'groupManager_page',
  components: {
    groupTable
  }, 
  data () {
    return {
      isDisabled:[],
      columns: [
        // sortable:可排列；editable：可编辑
        { title: 'Name', key: 'name', sortable: true },
        { title: 'nickname', key: 'nickname', editable: true },
        { title: 'phone', key: 'phone', editable: true },
        { title: 'Create-Time', key: 'createTime' },
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
                    vm.$emit('input', params.groupData.filter((item, index) => index !== params.row.initRowIndex))
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
      groupData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.group.exportCsv({
        filename: `group-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getGroupData().then(res => {
      console.log(this.isDisabled)
      this.groupData = res.data
      for(var i=0;i<this.groupData.length;i++)
      {
        this.isDisabled[i]= this.groupData[i].disabled ? "恢复": "禁用";
        this.groupData[i].disabled = this.groupData[i].disabled ? "是": "否";
      }
    })
  }
}
</script>

<style scoped>
  .group /deep/ .ivu-table-wrapper {
    overflow: visible
  }
  .group /deep/ .ivu-poptip-rel>.ivu-btn{
    background-color: #19be6b;
  }
</style>
