import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

Font.register({ family: 'NotoSansArabic',src: "./fonts/NotoSans/NotoKufiArabic-VariableFont_wght.ttf"});

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
    borderTop: "10px solid rgb(24 52 68)",
    fontFamily: 'NotoSansArabic'
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
    height: "100%",
    width: "100%",
    textAlign:"right",
  },
  role: {
    fontSize: 14
  },
  brand_name: {
    color: "rgb(24 52 68)",
    fontWeight: "extrabold",
    direction: "rtl",
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
    direction: "rtl",
    textAlign: "right"
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
    direction: "rtl",
    textAlign: "right"
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
    direction: "rtl",
    textAlign: "right"
  },
  timeframe_header: {
    color: "#FAFAFA",
    fontSize: 11,
    direction: "rtl",
    textAlign: "right"
  },
  notes_header: {
    color: "#FAFAFA",
    fontSize: 11,
    direction: "rtl",
    textAlign: "right"
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
    direction: "rtl",
    textAlign: "right"
  },
  marginT5: {
    marginTop: "5px"
  },
});
// Create Document Component
export default function CoursesPdf ({courses, role_name, brand_name, region}) {

    return (
        <Document>
            <Page size="letter" style={styles.page} key={1}>
                <View style={styles.courses_holder}>
                    <View style={styles.header_container} fixed>
                        <View style={styles.header_text}>
                            <Text style={styles.brand_name}>{(brand_name).toUpperCase()}</Text>
                            <Text style={styles.role}>{(role_name)}</Text>
                        </View>
                    </View>
                    <View style={styles.row} fixed>
                        <View style={styles.row5header}>
                            <Text style={styles.notes_header}>{('Notes')}</Text>
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
                        <View style={styles.row3header}>
                            <Text style={styles.timeframe_header}>{('Course ID')}</Text>
                        </View>
                        <View style={region !== 'emeaa' ?  styles.row2header : styles.row2header70 }>
                            <Text style={styles.title_header}>{('Course Title')}</Text>
                        </View>
                        <View style={styles.row1header}>
                        </View>
                    </View>
                    {
                        courses ?
                            courses.map((item, key) => {
                                return (
                                    <View key={key} style={styles.row} wrap={false}>
                                        <View style={styles.row5}>
                                            <Text style={styles.row4text}>
                                                {(item.notes)}
                                            </Text>
                                        </View>
                                        {

                                          region !== 'emeaa'
                                          ?

                                            <View style={styles.row4}>
                                              <Text style={styles.bold}>
                                                {(item.timeframe)}
                                              </Text>
                                            </View>
                                          :
                                            <View></View>
                                        }
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
                                        <View style={region !== 'emeaa' ? styles.row2 : styles.row270}>
                                            <Text style={styles.bold}>
                                                {(item.title)}
                                            </Text>
                                        </View>
                                      <View style={styles.row1}>
                                          <View style={styles.checkbox}></View>
                                      </View>
                                    </View>
                                )
                            })
                        : <></>
                    }
                </View>
                <View style={styles.footer} fixed>
                  <Text style={styles.footer_text}>
                  &copy; 2024 &nbsp; IHG Hotels & Resorts. All rights reserved. Proprietary and Confidential.</Text>
                </View>
            </Page>
        </Document>
    )
}
