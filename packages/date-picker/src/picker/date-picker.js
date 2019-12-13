import Picker from '../picker';
import DatePanel from '../panel/date';
import DateRangePanel from '../panel/date-range';
import MonthRangePanel from '../panel/month-range';
import { bus } from '../bus';

const getPanel = function(type) {
  if (type === 'daterange' || type === 'datetimerange') {
    return DateRangePanel;
  } else if (type === 'monthrange') {
    return MonthRangePanel;
  }
  return DatePanel;
};

export default {
  mixins: [Picker],

  name: 'ElDatePicker',

  props: {
    type: {
      type: String,
      default: 'date'
    },
    timeArrowControl: Boolean
  },

  mounted() {
    this.panel = getPanel(this.type);
    bus.$on('changeType', function(type) {
      this.changetype(type);
    }.bind(this));
  },

  methods: {
    changetype(type) {
      console.log(type, 'watch');
      if (this.picker) {
        this.unmountPicker();
        this.hidePicker();
        this.blur();
        this.handleClose();
        this.picker.handleClear();
        this.panel = getPanel(type);
        this.mountPicker();
        this.showPicker();
      } else {
        bus.$emit('changedatetype', type);
        this.panel = getPanel(type);
      }
    }
  }
};
