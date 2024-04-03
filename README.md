vue3 + element-plus


        添加组件 使用组件关联时 需实现
        option {
            moduleValue:'',
            // 此字段为prop的描述
            propDesc:[
                { label: '', value: 'moduleValue' },
            ],
            events: [
                { label: '修改时触发', event: 'onChange' }
            ],
            // 事件和组件绑定关系
            listeners:[
                relComponentId: string;
                relEvent: string;
                relMap: Record<any, any>
            ]
        },