console.log('data.js');


url='https://6900bb26119175151fb10f1c4a56ed77862083b3-www.googledrive.com/host/0B7um4d7u6gG0U0VTUmJNb0NyUUE/Dsrip/AppForData%20/all.txt';

$.get(url,function(x){
    console.log('loaded string with length '+x.length);
    // separate the rows
    var fields=[];
    var y=[] ;// results will go here
    var b={}; //group Subgroups_ together

    var z = [];
    var kntr = -1;

    x.split(/[\n\r]+/g)
     .forEach(function(r,i){ // process one row at a time
         if(i===0){ // header
             fields=r.split(',');
         }else{
             // create arrayed row
             var ar = r.replace(/  /g,'')
              .replace(/(,")|(",)/g,'##')
              .slice(0,-2)
              .split('##')
              .map(function(xi){
                  if(xi[0]==','){ // if string starts with "," remove it
                      xi = xi.slice(1);
                  }
                  if(xi.slice(-1)==' '){ // also remove trailing blanks
                      xi = xi.slice(0,-1);
                  }
                  return xi;
              });
             yi={};
             fields.map(function(f,j){
                yi[f]=ar[j];
             });

            var subGroup = {};
            if (b[yi.Subgroups_] === undefined) {
                console.log("initializing group : "+yi.Subgroups_);
                kntr++;
                b[yi.Subgroups_] = {};
                b[yi.Subgroups_].name = yi.Subgroups_;
                b[yi.Subgroups_].children = [];
                subGroup['name'] = yi.Subgroups_;
                subGroup['children'] = [];

                z.push(subGroup);
            }

            c = {
            name: yi["ICD-9 description_"],
            count: yi.Counts_,
            icd9Code: yi["ICD-9"]
          };
          z[kntr].children.push(c);

              //console.log(b[yi.Subgroups_]);
         }

     });
    //console.log(b);
    //console.log(JSON.stringify(b));
     var a= {};
     a.name="all";
     a.children=z;
     // a good place to build graphics


    document.body.innerHTML= '<h3>The data:</h3><pre>'+JSON.stringify(a,null,3)+'</pre>';
});
