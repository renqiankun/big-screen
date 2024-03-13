<template>
    <el-button  type="primary" plain @click="uploadHand" v-bind="$attrs"
      >{{ text }}
      <teleport to="body">
      <input
        type="file"
        ref="uploadRef"
        @change="fileChangeHand"
        :accept="accept"
        v-show="false"
      />
    </teleport>
    </el-button>
  
  </template>
  
  <script setup lang="ts">
  import { ElMessage, ElLoading } from "element-plus";
  import { ref } from "vue";
  // import { commonUploadFetch } from "../../api/common";
  
  interface Props {
    // name?: any;
    accept?: any;
    // tip?: "";
    maxSize?: number; // MB
    text?: string;
    preCheck?: Function; // 选择文件前置校验
  }
  const props = withDefaults(defineProps<Props>(), {
    name: "",
    /*  过滤文件 .jpg,.pdf,.png,.doc,.docx */
    accept: "",
    /* 支持扩展名：.pdf .jpg .png .doc .docx */
    tip: "",
    maxSize: Infinity,
    text: "上传文件",
  });
  let uploadRef: any = ref("");
  const fileChangeHand = async (fileVal: any) => {
    // uploadRef.value?.handleRemove?.(file);
    var file = fileVal.target?.files?.[0] ?? {};
    try {
      fileVal.target.value = "";
    } catch (e) {}
    let fileName = file.name;
    let fileSize = file.size / 1024 / 1024;
    let maxSize = props.maxSize;
    /* 5M */ /*   判断文件类型 */
    let index = fileName.lastIndexOf(".");
    let ext = fileName.slice(index);
    let accept = props.accept.split(",");
    if (accept.length > 0 && accept.indexOf(ext) <= -1) {
      ElMessage.error("文件格式错误，请重新上传!");
      return false;
    }
    if (fileSize > maxSize) {
      return ElMessage.error(`文件不可大于${maxSize}M`);
    }
    emits("change", file);
  };
  const uploadHand = async () => {
    if (props.preCheck) {
      var result = await props.preCheck?.();
      if (!result) return;
    }
    uploadRef.value.click?.();
  };
  const emits = defineEmits(["change"]);
  </script>
  
  <style lang="scss" scoped></style>
  