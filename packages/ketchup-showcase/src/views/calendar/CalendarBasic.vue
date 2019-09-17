<template>
  <div>
    <h3>Month view</h3>
    <kup-calendar
      :data.prop="basicData"
      date-col="date"
      descr-col="descr"
    ></kup-calendar>

    <h3>Week view</h3>
    <kup-calendar
      :data.prop="basicData"
      date-col="date"
      descr-col="descr"
      week-view
    ></kup-calendar>

    <h3>Hidden navigation</h3>
    <kup-calendar
      :data.prop="basicData"
      date-col="date"
      descr-col="descr"
      hide-navigation
    ></kup-calendar>
  </div>
</template>

<script>
export default {
  name: 'calendarBasic',
  data() {
    return {
      basicData: {
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