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
            value: false
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
                .br()
                .add('nested dynamic')
                .add(this.dynamic(function(showData) {
                    console.log("outer");
                    this.add(self.dynamic(function (showData) {
                        console.log("inner");
                        this.add('show data is ', '' + showData);
                    }));
                    // this.select(self.dao, function (obj) {
                    //     //     this.start('div').add(obj.id).end()
                    //     // })
                }))
                .add('after nested dynamic')
                .br()
                .add('simple dynamic')
                .add(this.dynamic(function (showData) {
                    console.log("inner");
                    this.add('show data is ', '' + showData);
                }))
                .add('after simple dynamic')
                .br()
                .add('simple select')
                .select(self.dao, function(obj) {
                    this.add(obj.id);
                })
                .add('after simple select')
                .br()
                .add('nested dynamic and select')
                .add(this.dynamic(function(showData) {
                    console.log("outer");
                    if (showData) {
                        this.select(self.dao, function (obj) {
                            this.add(obj.id);
                        })
                    }
                }))
                .add('after nested dynamic and select');

        }
    ]
})