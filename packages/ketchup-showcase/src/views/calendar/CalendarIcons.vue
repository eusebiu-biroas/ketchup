<template>
  <div>
    <h3>Events with icons (month view)</h3>
    <kup-calendar
      :data.prop="iconData"
      date-col="date"
      descr-col="descr"
      icon-col="icon"
      initial-date="2019-09-18"
    ></kup-calendar>
    <hr />

    <h3>Events with icons (week view)</h3>
    <kup-calendar
      :data.prop="iconData"
      date-col="date"
      descr-col="descr"
      week-view
      icon-col="icon"
      initial-date="2019-09-18"
    ></kup-calendar>
  </div>
</template>

<script>
export default {
  name: 'calendarBasic',
  data() {
    return {
      iconData: {
        columns: [
          {
            name: 'date',
            title: 'Date',
            size: '',
          },
          {
            name: 'descr',
            title: 'Description',
            size: 10,
          },
          {
            name: 'icon',
            title: 'Icon',
            size: 10,
          },
        ],
        rows: [
          {
            cells: {
              date: {
                obj: {
                  t: 'D8',
                  p: '*YYMD',
                  k: '20190919',
                },
                value: '19/09/2019',
              },
              descr: {
                obj: {
                  t: '',
                  p: '',
                  k: '',
                },
                value: 'Test',
              },
              icon: {
                obj: {
                  t: 'J4',
                  p: 'ICO',
                  k: 'OG;CON;COL',
                },
                value:
                  'mdi mdi-account;mdi mdi-plus;mdi mdi-briefcase;mdi mdi-github-circle',
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style> 