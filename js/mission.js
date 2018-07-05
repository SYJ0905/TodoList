var app = new Vue({
    el: '#app',
    data:{
        // 綁定輸入攔內容變化 v-model
        missionContent: '',
        // 創建一個陣列，使用v-for迴圈
        missionList: [],
        // 頁籤需要判斷用
        visibility: 'all',
        cacheMission: {},
        cacheContent: ''
    },
    methods: {
        // 新增任務
        addMission: function(){
            var text = this.missionContent.trim();
            var timestamp = Math.floor(Date.now());
            // 輸入的內容是空值就不新增，需放前面
            if (text == '') {
                return;
            }
            this.missionList.push({
                // checkbox的 id 與 for 綁定
                id: timestamp,
                content: text,
                // checkbox 綁定 v-model="missionInfo.finish" 
                finish: false
            });
            this.missionContent = '';
        },
        // 刪除任務
        removeMission: function (removeItem){
            // 顯示要刪除的物件
            console.log(removeItem);
            // 在外先宣告"accurateIndex"，
            var accurateIndex = '';
            // 在html寫removeMission(missionInfo) ，這裡卻無法看missionInfo是甚麼東西
            // console.log(missionInfo); 
            // 對missionList裡面的所有物件執行forEach的function，
            // 傳入的參數為本身的物件和索引，
            this.missionList.forEach(function (missionInfo, index){
                // 比對欲刪除任務的id是否與最初陣列內的物件id相符合
                if (removeItem.id == missionInfo.id){
                    // 如果id互相符合，就將最初的索引塞進accurateIndex內，
                    accurateIndex = index;
                };
            });
            this.missionList.splice(accurateIndex, 1);
        },
        // 編輯任務
        editMission: function (missionInfo){
            //先把雙擊兩下點擊到的物件存入站存物件裡頭
            this.cacheMission = missionInfo; 
            //編輯內容放入站存的內容作顯示用
            this.cacheContent = missionInfo.content;
        },
        // 取消編輯
        cancelEdit: function(){
            this.cacheMission = {};
        },
        // 完成編輯
        doneEdit: function (missionInfo){
            // 編輯好的內容存入原本的content
            missionInfo.content = this.cacheContent;
            // 將暫存的內容變成空字串和空物件
            this.cacheContent = '';
            this.cacheMission = {};
        },
        // 清除所有任務
        removeAllmission: function(){
            // 若沒有任務，則不須跳出提示
            if(this.missionList[0] == null){
                alert('目前沒有任務');
            } else if (this.missionList !== []) {
                let check = confirm('是否要刪除全部任務');
                if (check == true) {
                    this.missionList = [];
                };
            };
        },
    },
    computed: {
        // 頁籤分類功能，更改 li 的 for迴圈 missionList
        filterMission: function(){
            // 顯示"全部"任務
            if(this.visibility == 'all'){
                return this.missionList;
            } else if (this.visibility == 'active') {
                // 顯示"進行中"任務
                // 對missionList陣列內的每一筆資料物件的finish去做判斷
                var activeMission = [];
                this.missionList.forEach(function(missionInfo){
                    if (missionInfo.finish == false){
                        activeMission.push(missionInfo);
                    };
                });
                return activeMission;
            } else if (this.visibility == 'done'){
                // 顯示"完成"的任務
                // 對missionList內的每一筆資料的completed去做判斷
                var doneMission = [];
                this.missionList.forEach(function (missionInfo){
                    if (missionInfo.finish == true){
                        doneMission.push(missionInfo);
                    };
                });
                return doneMission;
            }
        },
        remainingCount: function(){
            var count = 0;
            this.missionList.forEach(function (missionInfo){
                if (missionInfo.finish == false){
                    count += 1;
                };
            });
            return count;
        }
    }
});
