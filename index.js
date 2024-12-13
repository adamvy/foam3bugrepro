foam.CLASS({
    name: 'Bug',
    extends: 'foam.u2.Controller',
    requires: [
        'foam.dao.EasyDAO'
    ],
    properties: [
        {
            class: 'Boolean',
            name: 'showData',
            value: true
        },
        {
            name: 'dao',
            factory: function () {
                return this.EasyDAO.create({
                    of: this.Entity,
                    seqNo: true,
                    daoType: 'MDAO'
                })
            }
        }
    ],
    classes: [
        {
            name: 'Entity',
            properties: [
                {
                    class: 'Int',
                    name: 'id'
                }
            ]
        }
    ],
    actions: [
        {
            name: 'addItem',
            code: function () {
                this.dao.put(this.Entity.create());
            }
        }
    ],
    methods: [
        function render() {
            var self = this;
            this.start()
                .add(this.SHOW_DATA)
                .add(this.ADD_ITEM)
                .end()
                .add(this.dynamic(function(showData) {
                    if ( showData ) {
                        this.select(self.dao, function (obj) {
                            this.start('div').add(obj.id).end()
                        })
                    }
                }));
        }
    ]
})