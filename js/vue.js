var app = new Vue({
    el: '#app',
    data: {
        missionContent: '',
        // v-for 需要陣列儲存資料內容
        missionList: [
            // {
            //     // checkbox 需要id for綁定
            //     id: '',
            //     content: '',
            //     // 點擊checkbox，觸發completed
            //     completed: false                
            // }
        ],
        // 預設顯示全部任務
        visibility: 'all',
        // 暫時存放mission
        cacheMission: {},
        // 編輯標題時預存的地方
        cacheContent: ''
    },
    methods: {
        // 新增任務
        addMission: function(){
            var value = this.missionContent.trim();
            var timestamp = Math.floor(Date.now());
            console.log(this);
            // 空值不加入任務
            if (value == ''){
                return;
            }
            // 在陣列塞入新增的變數，原資料已做綁定
            this.missionList.push({
                id: timestamp,
                content: value,
                completed: false
            });
            this.missionContent = '';
            
        },

        // 刪除任務
        removeMission: function (todo){
            // 需要知道index
            // 頁籤變換導致index變動設定
            var newIndex = '';
            
            this.missionList.forEach(function (missionInfo, key){
                if (todo.id === missionInfo.id ){
                    newIndex = key;
                };
            });
            // 刪除陣列裡的物件
            this.missionList.splice(newIndex, 1);
        },

        // 編輯任務
        editMission: function (missionInfo){
            // function內需有參數
            // 必須知道哪一筆資料正在編輯中，回頭宣告新的資料
            this.cacheMission = missionInfo;
            this.cacheContent = missionInfo.content;
        },

        // 取消編輯
        cancelEdit: function (){
            this.cacheMission = {};
        },

        // 完成編輯
        doneEdit: function (missionInfo){
            missionInfo.content = this.cacheContent;
            this.cacheContent = '';
            this.cacheMission = {};
        },

        // 移除所有任務
        removeAllmission: function (){
            this.missionList = [];
        }

    },

    
    computed: {
        // 頁籤分類功能，for迴圈需做更動
        filteredMission: function(){
            if(this.visibility == 'all'){
                // 顯示全部任務
                return this.missionList;
            } else if (this.visibility == 'active'){
                // 顯示進行中任務，對missionList內的每一筆資料的completed去做判斷
                // 注意function內需要有參數
                var activeMission = [];
                this.missionList.forEach(function (missionInfo){
                    if (missionInfo.completed == false) {
                        activeMission.push(missionInfo);
                    };
                });
                return activeMission;
            } else if (this.visibility == 'done') {
                // 顯示已完成任務，對missionList內的每一筆資料的completed去做判斷
                // 注意function內需要有參數
                var doneMission = [];
                this.missionList.forEach(function (missionInfo) {
                    if (missionInfo.completed == true) {
                        doneMission.push(missionInfo);
                    };
                });
                return doneMission;
            }
        },
        // 剩餘幾筆數數量
        remainingCount: function(){
            var count = 0;
            this.missionList.forEach(function (missionInfo){
                if (missionInfo.completed === false){
                    count++;
                };
            });
            return count;
        }
    }
});

