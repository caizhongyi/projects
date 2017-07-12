using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Tool
{
    public class UnitConvResultModel
    {
        private string _unit_name;

        private string _value;

        public UnitConvResultModel()
        {
            _unit_name = string.Empty;
            _value = string.Empty;
        }

        public string unit_name
        {
            get { return _unit_name; }
            set { _unit_name = value; }
        }

        public string value
        {
            get { return this._value; }
            set { this._value = value; }
        }
    }
}
