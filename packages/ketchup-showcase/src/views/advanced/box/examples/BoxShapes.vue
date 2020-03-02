<template>
  <div>
    <h3>Shapes</h3>
    <p>Images and progress bars</p>
    <kup-box :data.prop="shapeData" :layout.prop="layout5"></kup-box>
    <p>&nbsp;</p>
    <p>HTML viewer</p>
    <kup-box :data.prop="htmlData" :layout.prop="layout6"></kup-box>
  </div>
</template>


<script>
import { shapeData } from '@/mock/box';
import { htmlData } from '@/mock/box';

export default {
  data() {
    return {
      shapeData: shapeData,
      htmlData: htmlData,
      layout5: {
        sections: [
          {
            horizontal: true,
            sections: [
              {
                dim: '10%',
                content: [
                  {
                    column: 'FLD1',
                    shape: 'IMG',
                    config: {
                      srcTemplate:
                        'https://via.placeholder.com/64?text={{obj.k}}',
                    },
                  },
                ],
              },
              {
                sections: [
                  { content: [{ column: 'FLD2' }] },
                  { content: [{ column: 'FLD3', shape: 'PGB' }] },
                ],
              },
            ],
          },
        ],
      },
      layout6: {
        sections: [
          {
            horizontal: true,
            sections: [
              {
                sections: [
                  { content: [{ column: 'FLD1', shape: 'EDT' }] }
                ],
              }
            ],
          },
        ],
      },      
    };
  },
};
</script>

<style scoped>
kup-box {
  --int_titled-section-bg-color: #fafafa;
}
</style>

