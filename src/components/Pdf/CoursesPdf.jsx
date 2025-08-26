import { Page, Text, View, Document, StyleSheet, Font, Link, Image} from '@react-pdf/renderer';

Font.register({ family: 'NotoSansJP',src: "./fonts/NotoSans/NotoSansJP-VariableFont_wght.ttf"});
Font.register({ family: 'NotoSansSC',src: "./fonts/NotoSans/NotoSansSC-VariableFont_wght.ttf"});
Font.register({ family: 'NotoSansThai',src: "./fonts/NotoSans/NotoSansThai-VariableFont_wdth,wght.ttf"});
Font.register({ family: 'Arimo',src: "./fonts/Arimo/Arimo-Regular.ttf"});
Font.register({ family: 'Graphik',src: "./fonts/graphik/Graphik-Regular.woff"});
Font.register({ family: 'Gulim',src: "./fonts/Gulim/gulim.ttf"});
Font.register({ family: 'BeVietnamPro',
  fonts: [
    {src: "./fonts/BeVietnamPro/BeVietnamPro-Regular.ttf", fontStyle: "normal", fontWeight: "normal"},
    {src: "./fonts/BeVietnamPro/BeVietnamPro-Bold.ttf", fontStyle: "normal", fontWeight: "bold"}
  ]
});

// Create styles
const styles = StyleSheet.create({
  priority_image:{
    width: 12,
    height: 12,
    marginRight: 3,
  },
  logo: {
    height: 40,
    width: "auto",
    backgroundColor: "rgb(24 52 68)",
    padding: 8,
  },
  header_logos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  watermark: {
    height: 250,
    width: "auto",
    top: 270,
    left: 200,
    position: "absolute",
    opacity: "0.1"
  },
  page: {
    paddingBottom: "0.5in",
    paddingTop:"0.25in",
    flexDirection: 'column',
    color: "#323232",
    borderTop: "10px solid rgb(24 52 68)"
  },

  items: {
    marginVertical: 5,
    flexDirection: "row",
  },
  checkbox: {
    border: "1px solid black",
    width: 13,
    height: 13,
  },
  courses_holder: {
    paddingHorizontal: ".5in",
    minHeight: "91vh"
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header_text: {
    justifyContent: "center",
    height: "100%",
    textAlign:"left",
  },
  role: {
    fontSize: 14
  },
  brand_name: {
    color: "rgb(24 52 68)",
    fontWeight: "extrabold",
  },
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontSize: 10,
    color: "#323232",
  },

  row1:{
    width: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  row450: {
    width: '50%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
  },
  row4text: {
    fontSize: 10,
    color: "#323232",
  },

  row1header:{
    width: "5%",
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(24 52 68)",
    color: "#FAFAFA"
  },
  row2header: {
    width: '35%',
    padding: 3,
    backgroundColor: "rgb(24 52 68)",
    color: "#121212"
  },
  row2: {
    width: '35%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
    justifyContent: "center"
  },
  row2header70: {
    width: '65%',
    padding: 3,
    backgroundColor: "rgb(24 52 68)",
    color: "#121212"
  },
  row270: {
    width: '65%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
    justifyContent: "center"
  },
  row3header: {
    width: "20%",
    padding: 3,
    backgroundColor: "rgb(24 52 68)",
    color: "#121212"
  },
  row3:{
    width: '20%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
    justifyContent: "center"
  },
  row4header: {
    width: '15%',
    padding: 3,
    backgroundColor: "rgb(24 52 68)",
    color: "#FAFAFA"
  },
  row4: {
    width: '15%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
    justifyContent: "center"
  },
  row5header: {
    width: '25%',
    padding: 3,
    backgroundColor: "rgb(24 52 68)",
  },
  row5: {
    width: '25%',
    margin: 3,
    padding: 3,
    borderBottom: "1px solid #183444",
    justifyContent: "center"
  },
  title_header: {
    color: "#FAFAFA",
    fontSize: 11,
  },
  timeframe_header: {
    color: "#FAFAFA",
    fontSize: 11,
  },
  notes_header: {
    color: "#FAFAFA",
    fontSize: 11,
  },
  footer: {
    bottom: 0,
    position: "fixed",
    textAlign: "center",
    flexDirection: "column",
    display: "flex"
  },
  footer_text: {
    fontSize: "11px"
  },
  link: {
    fontSize: "10px",
  },
  marginT5: {
    marginTop: "5px"
  },
});

// Create Document Component
export default function CoursesPdf ({courses, role_name, brand_name, region, lang}) {

    let fontFamily = false;

    if(lang === 'ja'){
      fontFamily = "NotoSansJP";
    } else if (lang === 'zh-cn') {
      fontFamily = "NotoSansSC";
    } else if (lang === 'vi') {
      fontFamily = "BeVietnamPro";
    } else if (lang === 'th') {
      fontFamily = "NotoSansThai";
    } else if (lang === 'ru'){
      fontFamily = "Arimo";
    } else if (lang === 'ko'){
      fontFamily = "Gulim";
    }

    let pageStyle = {...styles.page}
    if(fontFamily){
      pageStyle.fontFamily = fontFamily;
    }
    
    return (
        <Document>
            <Page size="letter" style={pageStyle} key={1}>
                <View style={styles.courses_holder}>
                    <View style={styles.header_container} fixed>
                        <View style={styles.header_text}>
                            <Text style={styles.brand_name}>{(brand_name).toUpperCase()}</Text>
                            <Text style={styles.role}>{(role_name)}</Text>
                        </View>
                    </View>
                    <View style={styles.row} fixed>
                        <View style={styles.row1header}>
                        </View>
                        <View style={region !== 'emeaa' ?  styles.row2header : styles.row2header70 }>
                          <Text style={styles.title_header}>{('Course Title')}</Text>
                        </View>
                        <View style={styles.row3header}>
                          <Text style={styles.timeframe_header}>{('Course ID')}</Text>
                        </View>
                        {
                          region !== 'emeaa'
                          ?
                          <View style={styles.row4header}>
                            <Text style={styles.timeframe_header}>{('Timeframe')}</Text>
                          </View>
                          :
                          <View></View>
                        }
                        <View style={styles.row5header}>
                            <Text style={styles.notes_header}>{('Notes')}</Text>
                        </View>
                    </View>
                    {
                        courses ?
                            courses.map((item, key) => {
                                return (
                                    <View key={key} style={styles.row} wrap={false}>
                                        <View style={styles.row1}>
                                            <View style={styles.checkbox}></View>
                                        </View>
                                        <View style={region !== 'emeaa' ? styles.row2 : styles.row270} wrap={true}>
                                          <View style={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
                                            {
                                              item.isPriority.toLowerCase() === "y" && <Image src="./img/favicon.png" style={styles.priority_image} />
                                            }
                                            <Text style={styles.bold} wrap={true}>
                                                {(item.title)}
                                            </Text>
                                          </View>
                                        </View>
                                        <View style={styles.row3} wrap={true}>
                                        {
                                            item.link ?
                                            <Text>
                                                <Link style={styles.link} src={item.link}>{item['course-id']}</Link>
                                            </Text>
                                            :
                                            <Text style={styles.link}>{item['course-id']}</Text>
                                        }
                                        </View>
                                        {

                                          region !== 'emeaa'
                                          ?
                                            <View style={styles.row4} wrap={true}>
                                                <Text style={styles.bold}>
                                                    {(item.timeframe)}
                                                </Text>
                                            </View>
                                          :
                                            <View></View>
                                        }
                                        <View style={styles.row5} wrap={true}>
                                            <Text style={styles.row4text} wrap={true}>
                                                {(item.notes)}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        : <></>
                    }
                </View>
                <View style={styles.footer} fixed>
                  <Text style={styles.footer_text}>
                  {['ja', 'zh-cn'].includes(lang) ? "(copyright)" : 'Ω'} &nbsp; 2024 &nbsp; IHG Hotels & Resorts. All rights reserved. Proprietary and Confidential.</Text>
                </View>
            </Page>
        </Document>
    )
}
