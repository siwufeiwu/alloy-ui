YUI.add("aui-color-picker-base-deprecated",function(e,t){var n=e.Lang,r=n.isArray,i=n.isObject,s=e.ColorUtil,t="colorpicker",o=e.getClassName,u=e.WidgetStdMod,a=o(t,"canvas"),f=o(t,"hue-canvas"),l=o(t,"container"),c=o(t,"controls"),h=o(t,"panel"),p=o(t,"swatch"),d=o(t,"swatch-current"),v=o(t,"swatch-original"),m=o(t,"thumb"),g=o(t,"thumb-image"),y=o(t,"hue-thumb"),b=o(t,"hue-thumb-image"),w=o(t,"hue","slider"),E=o(t,"hue","slider","content"),S=o(t,"trigger"),x='<div class="'+a+'"></div>',T='<span class="'+f+'"></span>',N='<div class="'+p+'"></div>',C='<div class="'+d+'"></div>',k='<div class="'+v+'"></div>',L='<div class="'+m+'"><div class="'+g+'"></div></div>',A='<span class="'+y+'"><span class="'+b+'"></span></span>',O=e.Component.create({NAME:t,ATTRS:{colors:{value:{},getter:function(){var t=this,n=t.get("rgb"),r=t.get("hex"),i={};return e.mix(i,n),i.hex=r,i}},hex:{value:"FFFFFF",getter:function(){var e=this,t=e.get("rgb"),n=t.hex;return n?n=n.split("#").join(""):n=s.rgb2hex(t),n},setter:function(t){var n=this;if(t){var r=s.getRGB("#"+t);t=r.hex.split("#").join(""),n.set("rgb",r)}else t=e.Attribute.INVALID_VALUE;return t}},hideOn:{value:"click"},hsv:{getter:function(e){var t=this,n=t.get("rgb");return s.rgb2hsv(n)},setter:function(t){var n=this;if(r(t)){var o=n.get("hsv"),u=s.hsv2rgb(t);n.set("rgb",u),o={hue:t[0],saturation:t[1],value:[2]}}else i(t)||(t=e.Attribute.INVALID_VALUE);return t},value:{h:0,s:0,v:0}},showOn:{value:"click"},pickersize:{value:180},rgb:{value:new s.RGB(255,255,255),setter:function(t){var n=this,o,u,a,f=!0;return r(t)?(o=t[0],u=t[0],a=t[0]):i?(o=t.r,u=t.g,a=t.b):(t=e.Attribute.INVALID_VALUE,f=!1),f&&(o=s.constrainTo(o,0,255,255),u=s.constrainTo(u,0,255,255),a=s.constrainTo(a,0,255,255),t=new s.RGB(o,u,a)),t}},strings:{value:{R:"R",G:"G",B:"B",H:"H",S:"S",V:"V",HEX:"#",DEG:"\u00b0",PERCENT:"%"}},triggerParent:{value:null},trigger:{lazyAdd:!0,getter:function(t){var n=this;return t||(n._buttonTrigger=new e.ButtonItem({cssClass:S,icon:"pencil"}),t=n._buttonTrigger.get("boundingBox"),t=new e.NodeList(t),n.set("trigger",t)),t}}},EXTENDS:e.OverlayContext,prototype:{renderUI:function(){var e=this,t=e._buttonTrigger;if(t&&!t.get("rendered")){var n=e.get("triggerParent");n||(n=e.get("boundingBox").get("parentNode")),t.render(n)}e._renderContainer(),e._renderSliders(),e._renderControls()},bindUI:function(){var t=this;O.superclass.bindUI.apply(this,arguments),t._createEvents(),t._colorCanvas.on("mousedown",t._onCanvasMouseDown,t),t._colorPicker.on("drag:start",t._onThumbDragStart,t),t._colorPicker.after("drag:drag",t._afterThumbDrag,t),t._hueSlider.after("valueChange",t._afterValueChange,t);var n=t._colorForm.get("contentBox");n.delegate("change",e.bind(t._onFormChange,t),"input"),t.after("hexChange",t._updateRGB),t.after("rgbChange",t._updateRGB),t._colorSwatchOriginal.on("click",t._restoreRGB,t),t.after("visibleChange",t._afterVisibleChangeCP)},syncUI:function(){var e=this;e._updatePickerOffset();var t=e.get("rgb");e._updateControls(),e._updateOriginalRGB()},_afterThumbDrag:function(e){var t=this,n=t._translateOffset(e.pageX,e.pageY);t._preventDragEvent||t.fire("colorChange",{ddEvent:e}),t._canvasThumbXY=n},_afterValueChange:function(e){var t=this;e.src!="controls"&&t.fire("colorChange",{slideEvent:e})},_afterVisibleChangeCP:function(e){var t=this;e.newVal&&(t.refreshAlign(),t._hueSlider.syncUI()),t._updateOriginalRGB()},_convertOffsetToValue:function(e,t){var n=this;if(r(e))return n._convertOffsetToValue.apply(n,e);var i=n.get("pickersize");return e=Math.round(e*i/100),t=Math.round(i-t*i/100),[e,t]},_convertValueToOffset:function(e,t){var n=this;return r(e)?n._convertValueToOffset.apply(n,e):(e=Math.round(e+n._offsetXY[0]),t=Math.round(t+n._offsetXY[1]),[e,t])},_createEvents:function(){var e=this;e.publish("colorChange",{defaultFn:e._onColorChange})},_getHuePicker:function(){var e=this,t=e.get("pickersize"),n=(t-e._hueSlider.get("value"))/t;return n=s.constrainTo(n,0,1,0),n===1?0:n},_getPickerSize:function(){var e=this;if(!e._pickerSize){var t=e._colorCanvas,n=t.get("offsetWidth");n||(n=t.getComputedStyle("width")),n=parseInt(n,10);var r=e._pickerThumb.get("offsetWidth");n-=r,e._pickerSize=n}return e._pickerSize},_getSaturationPicker:function(){var e=this;return e._canvasThumbXY[0]/e._getPickerSize()},_getThumbOffset:function(){var e=this;if(!e._thumbOffset){var t=e._pickerThumb,n=t.get("offsetHeight"),r=t.get("offsetWidth");e._thumbOffset=[Math.floor(r/2),Math.floor(n/2)]}return e._thumbOffset},_getValuePicker:function(){var e=this,t=e._getPickerSize();return(t-e._canvasThumbXY[1])/t},_onCanvasMouseDown:function(e){var t=this;t._setDragStart(e.pageX,e.pageY),e.halt(),t.fire("colorChange",{ddEvent:e})},_onColorChange:function(e){var t=this,n=t._getHuePicker(),r=t._getSaturationPicker(),i=t._getValuePicker(),o=s.hsv2rgb(n,r,i);e.src!="controls"&&t.set("rgb",o),t._updateControls();if(!e.ddEvent){e.slideEvent||(t._updateHue(),t._updatePickerThumb(),n=t._getHuePicker());var u=s.hsv2rgb(n,1,1);t._updateCanvas(u)}t._updateColorSwatch()},_onFormChange:function(e){var t=this,n=e.currentTarget,r=n.get("id");r!="hex"&&(r="rgb."+r),t.set(r,n.val())},_onThumbDragStart:function(e){var t=this;t._updatePickerOffset()},_renderContainer:function(){var t=this;if(!t._pickerContainer){var n=(new e.Panel({bodyContent:""})).render(t.get("contentBox")),r=n.bodyNode;r.addClass(l),t._pickerContainer=r,n.headerNode.remove();var i=n.get("boundingBox");i.addClass(h)}},_renderControls:function(){var t=this;t._colorSwatch=e.Node.create(N),t._colorSwatchCurrent=e.Node.create(C),t._colorSwatchOriginal=e.Node.create(k),t._colorSwatch.appendChild(t._colorSwatchCurrent),t._colorSwatch.appendChild(t._colorSwatchOriginal),t._pickerContainer.appendChild(t._colorSwatch);var n=t.get("strings"),r=(new e.Form({labelAlign:"left"})).render(t._pickerContainer);r.add([{id:"r",labelText:n.R,size:3},{id:"g",labelText:n.G,size:3},{id:"b",labelText:n.B,size:3},{id:"hex",labelText:n.HEX,size:6}],!0),r.get("boundingBox").addClass
(c),t._colorForm=r},_renderSliders:function(){var t=this;t._colorCanvas=e.Node.create(x),t._pickerThumb=e.Node.create(L),t._colorCanvas.appendChild(t._pickerThumb),t._pickerContainer.appendChild(t._colorCanvas);var n=t.get("pickersize");t._colorPicker=(new e.DD.Drag({node:t._pickerThumb})).plug(e.Plugin.DDConstrained,{constrain2node:t._colorCanvas});var r=new e.Slider({axis:"y",min:0,max:n,length:t._colorCanvas.get("offsetHeight")});r.RAIL_TEMPLATE=T,r.THUMB_TEMPLATE=A,r.get("boundingBox").addClass(w),r.get("contentBox").addClass(E),r.render(t._pickerContainer),t._hueSlider=r},_restoreRGB:function(e){var t=this;t.set("rgb",t._oldRGB),t._updateHue(),t._updatePickerThumb(),t._updateColorSwatch(),t.fire("colorChange")},_setDragStart:function(t,n){var i=this;if(r(t))return i._setDragStart.apply(i,t);var s=i._colorPicker;s._dragThreshMet=!0,s._fixIEMouseDown(),e.DD.DDM.activeDrag=s;var o=s.get("dragNode").getXY(),u=i._getThumbOffset();o[0]+=u[0],o[1]+=u[1],s._setStartPosition(o),s.set("activeHandle",s.get("dragNode")),s.start(),s._alignNode([t,n])},_translateOffset:function(e,t){var n=this,r=n._offsetXY,i=[];return i[0]=Math.round(e-r[0]),i[1]=Math.round(t-r[1]),i},_updateCanvas:function(e){var t=this;e=e||t.get("rgb"),t._colorCanvas.setStyle("backgroundColor","rgb("+[e.r,e.g,e.b].join(",")+")")},_updateColorSwatch:function(e){var t=this;e=e||t.get("rgb"),t._colorSwatchCurrent.setStyle("backgroundColor","rgb("+[e.r,e.g,e.b].join(",")+")")},_updateControls:function(){var e=this,t=e.get("colors");e._colorForm.set("values",t)},_updateHue:function(){var e=this,t=e.get("pickersize"),n=e.get("hsv.h");n=t-Math.round(n*t),n===t&&(n=0),e._hueSlider.set("value",n,{src:"controls"})},_updateOriginalColorSwatch:function(e){var t=this;e=e||t.get("rgb"),t._colorSwatchOriginal.setStyle("backgroundColor","rgb("+[e.r,e.g,e.b].join(",")+")")},_updateOriginalRGB:function(){var e=this;e._oldRGB=e.get("rgb"),e._updateOriginalColorSwatch(e._oldRGB)},_updatePickerOffset:function(){var e=this;e._offsetXY=e._colorCanvas.getXY()},_updatePickerThumb:function(){var e=this;e._updatePickerOffset();var t=e.get("hsv"),n=e.get("pickersize");t.s=Math.round(t.s*100);var r=t.s;t.v=Math.round(t.v*100);var i=t.v,s=e._convertOffsetToValue(r,i);s=e._convertValueToOffset(s),e._canvasThumbXY=s;var o=e._colorPicker;e._preventDragEvent=!0,o._setStartPosition(o.get("dragNode").getXY()),o._alignNode(s,!0),e._preventDragEvent=!1},_updateRGB:function(e){var t=this;(e.subAttrName||e.attrName=="hex")&&t.fire("colorChange",{src:"controls"})},_canvasThumbXY:[0,0],_offsetXY:[0,0]}});e.ColorPicker=O},"3.0.3-deprecated.43",{requires:["dd-drag","panel","slider","aui-button-item-deprecated","aui-color-util-deprecated","aui-form-base-deprecated","aui-overlay-context-deprecated"],skinnable:!0});
